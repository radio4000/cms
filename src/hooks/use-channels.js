import {useState, useEffect} from 'react'

export default function useChannels(database) {
	const [channels, setChannels] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			let res
			try {
				res = await database.from('channels').select('*').limit(30).order('created_at', {ascending: true})
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
