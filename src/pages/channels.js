import useChannels from '../hooks/use-channels'
import useTracks from '../hooks/use-tracks'
import Tracks, {CreateTrackForm} from '../components/tracks'

export default function PageChannels({dbSession: {database, session}}) {
	const {channels, loading} = useChannels(database)

	if (loading) return <p>...</p>
	if (!channels.length) return <p>No channels</p>

	return channels.map((channel) => (
		<Channel key={channel.id} channel={channel} session={session} database={database} />
	))
}

function Channel({channel, session, database}) {
	const {data: tracks, setTracks, error} = useTracks(channel.id, database)

	if (error) return <p>{error.details}</p>

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
						afterSubmit={({data: track}) => {
							setTracks(tracks.concat(track))
						}}
					></CreateTrackForm>
				</>
			)}

			<h3>Tracks</h3>
			<Tracks
				tracks={tracks}
				database={database}
				afterDelete={(data) => {
					setTracks(tracks.filter((track) => track.id !== data.id))
				}}
			></Tracks>
		</article>
	)
}
