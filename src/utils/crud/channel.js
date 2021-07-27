export const createChannel = async ({database, channel, user}) => {
	const {name, slug} = channel
	const {id: user_id} = user

	// Create channel
	const res = await database
		.from('channels')
		.insert({
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
			user_id,
			channel_id: res.data.id,
		})
		.single()
}

export const updateChannel = async ({database, id, changes}) => {
	console.log('updating channel', id, changes)
	const {name, slug} = changes
	return database.from('channels').update({name, slug}).eq('id', id)
}

export const deleteChannel = async ({database, id}) => {
	if (!id) return
	console.log('deleting channel', id)
	return database.from('channels').delete().eq('id', id)
}
