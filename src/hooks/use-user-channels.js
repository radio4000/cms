import {useState, useEffect} from 'react'

const useUserChannels = (database, userId) => {
	const [channels, setChannels] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			let res
			try {
				res = await database
					.from('user_channel')
					.select(`*`)
					.eq('user_id', userId)
				setChannels(res.data)
			} catch(e) {
				console.log('error fetching channels', e)
				throw new Error(e.message)
			}
		}
		fetchData()
	}, [userId, database])

	return channels
}

export default useUserChannels
