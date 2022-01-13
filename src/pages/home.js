import config from 'config'
import {Link} from 'react-router-dom'
import useChannels from 'hooks/use-channels'
import Channels from 'components/channels'

const {RADIO4000_APP_NAME} = config

const sortByUpdated = (a, b) => (a['updated_at'] > b['updated_at'] ? 1 : -1)

export default function PageHome({dbSession: {database, session, userChannel}}) {
	const {channels} = useChannels(database)
	const channelsLimit = 3
	const channelsLastUpdate = [...channels].sort(sortByUpdated).slice(0, channelsLimit)
	const channelsLastCreated = channels.slice(0, channelsLimit)

	return (
		<>
			{!session ? (
				<header>
					<p>Welcome to the new {RADIO4000_APP_NAME}!</p>
				</header>
			) : (
				<>
					{userChannel && (
						<p>
							Go to your channel <Link to={`/${userChannel.slug}/`}>{userChannel.slug}</Link>.
						</p>
					)}
				</>
			)}

			{channelsLastUpdate && (
				<>
					<p>Recent activity</p>
					<Channels channels={channelsLastUpdate} />
				</>
			)}

			{channelsLastCreated && (
				<>
					<p>New radios</p>
					<Channels channels={channelsLastCreated} />
				</>
			)}
		</>
	)
}
