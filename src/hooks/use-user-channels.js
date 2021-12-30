import {useState, useEffect} from 'react'

const useUserChannels = (database, userId) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [channels, setChannels] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			let userChannel
			try {
				userChannel = await database
					.from('user_channel')
					.select('channel_id')
					.eq('user_id', userId)
					.single()
				setError(false)
			} catch (err) {
				setError(err.message)
				setLoading(false)
				throw new Error(err.message)
			}

			if (!userChannel?.data) {
				setError(false)
				setLoading(false)
				return
			}

			try {
				const res = await database
					.from('channels')
					.select(`*`)
					.eq('id', userChannel.data.channel_id)
				setChannels(res.data)
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

	return {channels, loading, error}
}

export default useUserChannels
