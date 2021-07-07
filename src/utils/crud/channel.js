const createChannel = async ({database, channel, user}) => {
	const {name, slug} = channel
	const {id: user_id} = user
	const now = new Date()

	return database
		.from('channels')
		.insert({
			name,
			slug,
			user_id,
			created_at: now,
			updated_at: now
		})
		.single()
}

const updateChannel = async ({database, channel}) => {
	const {id, name, slug} = channel
	return database
		.from('channels')
		.update({
			name,
			slug,
			updated_at: new Date()
		}).eq('id', id).single()
}

const deleteChannel = async ({database, channel}) => {
	const {id} = channel
	console.log(channel)
	if (!id) return

	return database
		.from('channels')
		.delete().match({id})
}

export {
	createChannel,
	updateChannel,
	deleteChannel
}
