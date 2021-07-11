DROP TABLE user_channel, channels, users;

-- Create a table for public "users"
create table users (
	id uuid references auth.users not null,
	created_at timestamp with time zone default CURRENT_TIMESTAMP,
	updated_at timestamp with time zone default CURRENT_TIMESTAMP,
	primary key (id)
);

alter table users enable row level security;

create policy "Public users are viewable by everyone."
	on users for select using (true);
create policy "Users can insert their own user."
	on users for insert with check (auth.uid() = id);
create policy "Users can update own user."
	on users for update using (auth.uid() = id);



-- Create a table for public "channels"
create table channels (
	id uuid DEFAULT gen_random_uuid() primary key,
	name text not null,
	slug text unique not null,
	created_at timestamp with time zone default CURRENT_TIMESTAMP,
	updated_at timestamp with time zone default CURRENT_TIMESTAMP,
	url text,
	user_id uuid references auth.users(id) not null,
	unique(slug),
	constraint slug_length check (char_length(slug) >= 4),
	foreign key (user_id) references auth.users(id) on delete cascade
);

alter table channels enable row level security;

create policy "Public channels are viewable by everyone."
	on channels for select using (true);
create policy "User can insert their own channel."
	on channels for insert with check (auth.uid() = user_id);
create policy "Users can update own channel."
	on channels for update using (auth.uid() = user_id);
create policy "Users can delete own channel."
	on channels for delete using (auth.uid() = user_id);



-- Create junction table for user >< channel
create table user_channel (
	user_id uuid not null references auth.users (id) on delete cascade,
	channel_id uuid not null references channels (id) on delete cascade,
	created_at timestamp with time zone default CURRENT_TIMESTAMP,
	updated_at timestamp with time zone default CURRENT_TIMESTAMP,
	PRIMARY KEY (user_id, channel_id)
);

alter table user_channel enable row level security;

create policy "User channel junctions are viewable by everyone"
	on user_channel for select using (true);
create policy "User can insert channel junction."
	on user_channel for insert with check (auth.uid() = user_id);
create policy "Users can update channel junction."
	on user_channel for update using (auth.uid() = user_id);
create policy "Users can delete channel junction."
	on user_channel for delete using (auth.uid() = user_id);


create policy "User can insert their junction."
	on user_channel for insert
	with check ( auth.uid() = user_id );

create policy "Users can update own junction."
	on user_channel for update
	using ( auth.uid() = user_id );

create policy "Users can delete own junction."
	on user_channel for delete
	using ( auth.uid() = user_id );

-- Set up Realtime!
begin;
	drop publication if exists supabase_realtime;
	create publication supabase_realtime;
commit;
alter publication supabase_realtime add table users;
alter publication supabase_realtime add table channels;



-- Create a procedure to delete the authenticated user
CREATE or replace function delete_user()
  returns void
LANGUAGE SQL SECURITY DEFINER
AS $$
	 delete from channels where user_id = auth.uid();
   delete from auth.users where id = auth.uid();
$$;



-- Automatically update "updated_at" timestamps
create extension if not exists moddatetime schema extensions;
-- this trigger will set the "updated_at" column to the current timestamp for every update
create trigger user_update before update on users
  for each row execute procedure moddatetime (updated_at);
create trigger channel_update before update on channels
  for each row execute procedure moddatetime (updated_at);
create trigger user_channel_update before update on user_channel
  for each row execute procedure moddatetime (updated_at);
