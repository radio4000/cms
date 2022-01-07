import {Link} from 'react-router-dom'
import {useState} from 'react'
import {CreateTrackForm} from 'components/track-forms'
import {UserChannelsSelect} from 'components/channels'

export default function PageAdd({
	dbSession: {userChannel, userChannels, database, session}
}) {
	const [message, setMessage] = useState('')
	if (!session) {
		return null
	}
	if (!userChannel) {
		return <p>Loading</p>
	}

	const handleChannelChanged = ({
		target: {
			name,
			value: selectedChannelSlug
		}
	}) => {
		const selectedChannel = userChannels.find(channel => {
			console.log(channel.slug, selectedChannelSlug)
			return channel.slug === selectedChannelSlug
		})
		userChannel.set(selectedChannel)
	}

	return (
		<>
			<header>
				<menu>
					<li>
						<Link to={`/${userChannel.slug}`}>
			&larr; Back to {userChannel.name}
						</Link>
						<UserChannelsSelect
						userChannel={userChannel}
						userChannels={userChannels}
						onChange={handleChannelChanged}
						/>
					</li>
				</menu>
			</header>
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
