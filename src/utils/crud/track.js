import {useState, useEffect} from 'react'

export function useTracks(channelId, database) {
	const [tracks, setTracks] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			let res
			try {
				res = await database
					.from('channel_track')
					.select('id:track_id, created_at, track_id(url, title, description)')
					.eq('channel_id', channelId)
				setTracks(res.data)
				setError(null)
			} catch (error) {
				setError(error)
				console.log('Error fetching tracks', error)
			}
		}
		fetchData()
	}, [channelId, database])

	return {data: tracks, error}
}

export const createTrack = async ({database, data, channelId, userId}) => {
	const {url, title, description} = data

	// Create track
	const res = await database.from('tracks').insert({url, title, description}).single()

	// Avoid touching next query (return early) if it did not succeed.
	// console.log('creating track', res)
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
	// console.log('updating', id, changes)
	const {url, title, description} = changes
	return database
		.from('tracks')
		.update({
			url,
			title,
			description
		})
		.eq('id', id)
		.single()
}

export const deleteTrack = async ({database, track}) => {
	if (!track.id) return
	return database.from('tracks').delete().match({id: track.id})
}
