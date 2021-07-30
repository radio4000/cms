import {useState, useEffect} from 'react'

export default function useChannels(database) {
	const [channels, setChannels] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			let res
			try {
				res = await database.from('channels').select('*')
				setChannels(res.data)
			} catch (e) {
				console.log('error fetching channels', e)
			}
		}
		fetchData()
	}, [database])

	return channels
}
