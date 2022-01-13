import {useState, useEffect} from 'react'

export default function useChannels(database, limit = 3000) {
	const [channels, setChannels] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			let res
			try {
				res = await database.from('channels').select('*').limit(limit).order('created_at', {ascending: true})
				setChannels(res.data)
			} catch (e) {
				console.log('error fetching channels', e)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [database])

	return {channels, loading}
}
