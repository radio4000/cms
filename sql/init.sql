-- Create a table for public "users"
create table users (
	id uuid references auth.users not null,
	updated_at timestamp with time zone,
	created_at timestamp with time zone,
	primary key (id)
);

alter table users enable row level security;

create policy "Public users are viewable by everyone."
	on users for select
	using ( true );

create policy "Users can insert their own user."
	on users for insert
	with check ( auth.uid() = id );

create policy "Users can update own user."
	on users for update
	using ( auth.uid() = id );

-- Create a table for public "channels"
create table channels (
	id uuid DEFAULT gen_random_uuid() primary key,
	data jsonb,
	name text,
	slug text unique,
	updated_at timestamp with time zone,
	created_at timestamp with time zone,
	url text,
	user_id uuid references auth.users(id) not null,
	unique(slug),
	constraint slug_length check (char_length(slug) >= 4),
	foreign key (user_id) references auth.users(id)
);

alter table channels enable row level security;

create policy "Public channels are viewable by everyone."
	on channels for select
	using ( true );

create policy "User can insert their own channel."
	on channels for insert
	with check ( auth.uid() = user_id );

create policy "Users can update own channel."
	on channels for update
	using ( auth.uid() = user_id );

create policy "Users can delete own channel."
	on channels for delete
	using ( auth.uid() = user_id );

-- Set up Realtime!
begin;
	drop publication if exists supabase_realtime;
	create publication supabase_realtime;
commit;
alter publication supabase_realtime add table users;
alter publication supabase_realtime add table channels;
