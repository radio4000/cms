import {useState, useEffect} from 'react'

export default function useCanEdit(database, userId, channelId) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [data, setData] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				setLoading(true)
				const res = await database
					.from('user_channel')
					.select(`*`)
					.eq('user_id', userId)
					.single()
				setError(res?.error ? res.error : false)
				setData(res?.data ? res.data : null)
			} catch (e) {
				setError(e)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [database, userId])

	const canEdit = Boolean(data?.channel_id === channelId)
	return {canEdit, loading, error}
}
