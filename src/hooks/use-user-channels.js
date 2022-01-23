import {useState, useEffect} from 'react'

const useUserChannels = (database, userId) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [userChannels, setUserChannels] = useState([])
	const [latestChannelByActivity, setLatestChannelByActivity] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)

			try {
				const {data: latestTracks} = await database
					.from('channel_track')
					.select('*')
					.eq('user_id', userId)
					.order('created_at', {ascending: false})
					.limit(1)
				setLatestChannelByActivity(latestTracks[0].channel_id)
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
		}
		if (userId) fetchData()
	}, [userId, database])

	return {
		userChannels: userChannels || [],
		latestChannelByActivity,
		loading,
		error,
	}
}

export default useUserChannels
