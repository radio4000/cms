import {useState, useEffect} from 'react'

export function useTracks(channelId, database) {
	const [tracks, setTracks] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			let res
			try {
				res = await database.from('channel_track').select('*').eq('channel_id', channelId)
				setTracks(res.data)
			} catch (error) {
				console.log('Error fetching tracks', error)
			}
		}
		fetchData()
	}, [channelId, database])

	return tracks
}

export const createTrack = async ({database, data, channelId, userId}) => {
	// Create channel
	const {url, title, description} = data
	const res = await database.from('tracks').insert({url, title, description}).single()
	// Avoid touching next query (return early) if it did not succeed.
	console.log('creating track', res)
	if (res.error) return res
	// Create junction table
	return database.from('channel_track').insert({
		track_id: res.data.id,
		channel_id: channelId,
		user_id: userId
	}).single()
}

// export const updateChannel = async ({database, channel}) => {
// 	const {id, name, slug} = channel
// 	return database
// 		.from('channels')
// 		.update({
// 			name,
// 			slug,
// 		})
// 		.eq('id', id)
// 		.single()
// }

// export const deleteChannel = async ({database, channel}) => {
// 	const {id} = channel
// 	console.log(channel)
// 	if (!id) return
// 	return database.from('channels').delete().match({id})
// }
