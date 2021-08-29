import useChannel from '../hooks/use-channel'
import useTracks from '../hooks/use-tracks'
import Tracks, {CreateTrackForm} from '../components/tracks'
import {useParams} from 'react-router-dom'

export default function PageChannels({dbSession: {database, session}}) {
	const {slug} = useParams()
	const {data: channel, error, loading} = useChannel(database, slug)
	if (loading) return <p>Loading...</p>
	if (error) return <p>{error.details}</p>
	if (!channel) return <p>Channel not found</p>
	return <Channel key={channel.id} channel={channel} session={session} database={database} />
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
