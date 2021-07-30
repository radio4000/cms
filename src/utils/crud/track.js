export const createTrack = async ({database, track, channelId, userId}) => {
	const {url, title, description} = track

	// Create track
	const res = await database.from('tracks').insert({url, title, description}).single()

	// Avoid touching next query (return early) if it did not succeed.
	if (res.error) return res

	// Create junction row
	return database
		.from('channel_track')
		.insert({
			track_id: res.data.id,
			channel_id: channelId,
			user_id: userId,
		})
		.single()
}

export const updateTrack = async ({database, id, changes}) => {
	const {url, title, description} = changes
	return database.from('tracks').update({url, title, description}).eq('id', id)
}

export const deleteTrack = async ({database, track}) => {
	if (!track.id) return
	return database.from('tracks').delete().eq('id', track.id)
}
