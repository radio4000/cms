import {useState} from 'react';
import {CreateTrackForm} from '../components/tracks'

export default function PageAdd({dbSession}) {
	const [message, setMessage] = useState('')
	const channel = dbSession.userChannel
	if (!channel) return <p>Loading</p>

	return (
		<>
			<p>Add track to {channel.name}.</p>
			<CreateTrackForm
				channelId={channel.id}
				database={dbSession.database}
				userId={dbSession.session.user.id}
				afterSubmit={({data: track}) => {
					console.log('added track', track)
					setMessage('Track added')
					setTimeout(() => setMessage(''), 3000)
				}}
			></CreateTrackForm>
			{message}
		</>
	)
}
