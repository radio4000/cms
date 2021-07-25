import useChannels from '../hooks/use-channels'
import Tracks, {CreateTrackForm} from '../components/tracks'

const PageChannels = ({dbSession: {database, session}}) => {
	const channels = useChannels(database)

	if (!database) return null

	if (!channels.length) return <p>No channels</p>
	return channels.map(channel => {
		return (
			<article key={channel.id}>
				<header>
					<span>{channel.name}</span>
					{' '}
					<i>@{channel.slug}</i>
				</header>
				<h3>Tracks</h3>
				<CreateTrackForm channelId={channel.id} database={database} userId={session.user.id}></CreateTrackForm>
				<Tracks channelId={channel.id} database={database}></Tracks>
			</article>
		)
	})

}

export default PageChannels
