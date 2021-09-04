import {useState, useEffect} from 'react'

const useUserChannels = (database, userId) => {
	const [channels, setChannels] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			let userChannel
			try {
				userChannel = await database
					.from('user_channel')
					.select('channel_id')
					.eq('user_id', userId)
					.single()
			} catch (err) {
				console.log('error fetching user channel', err)
				throw new Error(err.message)
			}

			if (!userChannel?.data) return

			try {
				const res = await database
					.from('channels')
					.select(`*`)
					.eq('id', userChannel.data.channel_id)
				setChannels(res.data)
			} catch (err) {
				console.log('error fetching channels', err)
				throw new Error(err.message)
			}
		}
		fetchData()
	}, [userId, database])

	return channels
}

export default useUserChannels
