export const createChannel = async ({database, channel, user}) => {
	const {name, slug} = channel
	const {id: user_id} = user
	const now = new Date()

	// Create channel
	const res = await database
		.from('channels')
		.insert({
			created_at: now,
			updated_at: now,
			name,
			slug,
			user_id,
		})
		.single()

	// Avoid touching next query (return early) if it did not succeed.
	if (res.error) return res

	// Create junction table
	return database
		.from('user_channel')
		.insert({
			created_at: now,
			updated_at: now,
			user_id,
			channel_id: res.data.id,
		})
		.single()
}

export const updateChannel = async ({database, channel}) => {
	const {id, name, slug} = channel
	return database
		.from('channels')
		.update({
			name,
			slug,
			updated_at: new Date(),
		})
		.eq('id', id)
		.single()
}

export const deleteChannel = async ({database, channel}) => {
	const {id} = channel
	console.log(channel)
	if (!id) return
	return database.from('channels').delete().match({id})
}
