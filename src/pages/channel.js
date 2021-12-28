import useChannel from '../hooks/use-channel'
import useTracks from '../hooks/use-tracks'
import Tracks, {CreateTrackForm} from '../components/tracks'
import {useParams} from 'react-router-dom'
import useCanEdit from '../hooks/use-can-edit'

export default function PageChannels({dbSession: {database, session}}) {
	const {slug} = useParams()
	const {data: channel, error, loading} = useChannel(database, session, slug)
	const {canEdit} = useCanEdit(database, session?.user.id, channel?.id)

	if (loading) return <p>Loading...</p>
	if (error) return <p>{error.details}</p>
	if (!channel) return <p>Channel not found</p>

	return (
		<Channel
			key={channel.id}
			channel={channel}
			session={session}
			database={database}
			canEdit={canEdit}
		/>
	)
}

function Channel({channel, session, database, canEdit}) {
	const {data: tracks, setTracks, error} = useTracks(channel.id, database)
	if (error) return <p>{error.details}</p>
	return (
		<article key={channel.id}>
			<h1>
				<span>{channel.name}</span> <i>@{channel.slug}</i>
			</h1>

			{channel.description}
			{canEdit && (
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

			<p>{tracks.length} tracks</p>

			<Tracks
				tracks={tracks}
				database={database}
				canEdit={canEdit}
				afterDelete={(data) => {
					setTracks(tracks.filter((track) => track.id !== data.id))
				}}
			></Tracks>
		</article>
	)
}
