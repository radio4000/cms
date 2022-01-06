import {useState, useEffect} from 'react'

const useUserChannels = (database, userId) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [channels, setChannels] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)

			try {
				const res = await database
					.from('channels')
					.select('*, user_channel!inner(user_id)')
					.eq('user_channel.user_id', userId)
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
