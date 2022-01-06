import config from 'config'
import {Link} from 'react-router-dom'
import useChannels from 'hooks/use-channels'
import Channels from 'components/channels'

const {
	RADIO4000_APP_NAME
} = config

export default function PageHome({
	dbSession: {database, session, userChannel}
}) {
	const {channels, loading} = useChannels(database)
	const channelsLimit = 3
	const channelsLastUpdate = channels.slice(0, channelsLimit)
	const channelsLastCreated = channels.slice(0, channelsLimit)

	return (
		<>
			{!session ? (
				<header>
					<p>Welcome to the new {RADIO4000_APP_NAME} website!</p>
				</header>
			) : (
				<>
					{userChannel && <p>You channel is <Link to={`/${userChannel.slug}`}>{userChannel.slug}</Link></p>}
				</>
			)}
			<>
				{channelsLastUpdate && (
					<>
						<p>Last {channelsLimit} channels updated</p>
						<Channels channels={channelsLastUpdate}/>
					</>
				)}
				{channelsLastCreated && (
					<>
						<p>Last {channelsLimit} channels created</p>
						<Channels channels={channelsLastCreated}/>
					</>
				)}
			</>
		</>
	)
}
