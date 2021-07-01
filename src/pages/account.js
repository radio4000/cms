import {useState, useEffect} from 'react'
import {supabase} from '../supabaseClient'
import {CreateForm, EditForm} from '../components/channel-forms'

// <Account> tries to fetch user's channel.
//	has channel? <EditForm channel>
//	else <CreateForm></CreateForm>

export default function Account({session}) {
	const [loading, setLoading] = useState(false)
	const [channel, setChannel] = useState(false)

	async function findChannel() {
		try {
			setLoading(true)
			const user = supabase.auth.user()
			let {data, error, status} = await supabase
				.from('channels')
				.select(`*`)
				.eq('user_id', user.id)
				.single()
			if (error && status !== 406) throw error
			if (data) setChannel(data)
		} catch (error) {
			console.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	// Start fetching channel as soon as we have a session.
	useEffect(() => {
		findChannel()
	}, [session])

	return (
		<article>
			<h1>R4</h1>
			{loading ? (
				<p>Loading</p>
			) : (
				<>
					{channel?.id ? (
						<EditForm channel={channel} onDelete={setChannel}></EditForm>
					) : (
						<CreateForm onCreate={setChannel}></CreateForm>
					)}
				</>
			)}
		</article>
	)
}
