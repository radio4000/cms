import {useState, useEffect} from 'react'

export default function useCanEdit(database, userId, channelId) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	// const [data, setData] = useState(null)
	const [canEdit, setCanEdit] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				setLoading(true)
				const res = await database
					.from('user_channel')
					.select('user_id, channel_id')
					.eq('user_id', userId)
					.single()
				setError(res?.error ? res.error : false)
				// setData(res?.data ? res.data : null)
				setCanEdit(res.data.channel_id === channelId)
			} catch (e) {
				setError(e)
			} finally {
				setLoading(false)
			}
		}

		if (userId && channelId) fetchData()
	}, [database, userId, channelId])

	return {canEdit, loading, error}
}
