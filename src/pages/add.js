import {Link} from 'react-router-dom'
import {useState} from 'react'
import {CreateTrackForm} from '../components/track-forms'

export default function PageAdd({
	dbSession: {userChannel, database, session}
}) {
	const [message, setMessage] = useState('')
	if (!userChannel) return <p>Loading</p>

	return (
		<>
			<p>
				<Link to={`/${userChannel.slug}`}>&larr; Back to {userChannel.name}</Link>
			</p>
			<h1>Add track</h1>
			<CreateTrackForm
				userChannelId={userChannel.id}
				database={database}
				userId={session.user.id}
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
