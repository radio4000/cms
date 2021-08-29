import {useState, useEffect} from 'react'

export default function useChannel(database, slug) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [data, setData] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			let res
			try {
				setLoading(true)
				res = await database.from('channels').select(`*`).eq('slug', slug).single()
				setError(res?.error ? res.error : false)
				setData(res?.data ? res.data : null)
			} catch (e) {
				setError(e)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [slug, database])

	return {loading, error, data}
}

