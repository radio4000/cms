import useChannels from '../hooks/use-channels'
import Tracks, {CreateTrackForm} from '../components/tracks'

export default function PageChannels({dbSession: {database, session}}) {
	const channels = useChannels(database)

	// if (!database || !session) return <p>Hum this should not happen</p>
	if (!channels.length) return <p>No channels</p>

	return channels.map((channel) => {
		return (
			<article key={channel.id}>
				<h1>
					<span>{channel.name}</span> <i>@{channel.slug}</i>
				</h1>
				{session && (
					<>
						<h3>Add track</h3>
						<CreateTrackForm
							channelId={channel.id}
							database={database}
							userId={session.user.id}
						></CreateTrackForm>
					</>
				)}
				<h3>Tracks</h3>
				<Tracks channelId={channel.id} database={database}></Tracks>
			</article>
		)
	})
}
