import {useState, useEffect} from 'react'

export default function useTracks(channelId, database) {
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
