import {useState, useEffect} from 'react'

const useUserChannels = (database, userId) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [userChannels, setUserChannels] = useState([])
	const [channelIdByActivity, setChannelIdByActivity] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			// Fetch user channels
			try {
				const res = await database
					.from('channels')
					.select('*, user_channel!inner(user_id)')
					.eq('user_channel.user_id', userId)
					.order('updated_at', {ascending: true})
				setUserChannels(res.data)
				setError(false)
			} catch (err) {
				setError(err)
				throw new Error(err.message)
			} finally {
				setLoading(false)
			}
			// Fetch latest track to set "active" user channel.
			const {data: latestTracks} = await database
				.from('channel_track')
				.select('*')
				.eq('user_id', userId)
				.order('created_at', {ascending: false})
				.limit(1)
			if (latestTracks.length) setChannelIdByActivity(latestTracks[0].channel_id)
		}
		if (userId) fetchData()
	}, [userId, database])

	return {
		userChannels,
		channelIdByActivity,
		loading,
		error,
	}
}

export default useUserChannels
