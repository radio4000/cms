import {Link, useParams} from 'react-router-dom'
import Tracks from '../../components/track-forms'
import useChannel from '../../hooks/use-channel'
import useTracks from '../../hooks/use-tracks'
import useCanEdit from '../../hooks/use-can-edit'

import {updateChannel, deleteChannel} from '../../utils/crud/channel'
import {UpdateForm, DeleteForm} from '../../components/channel-forms'

export default function PageChannels({dbSession: {database, session}}) {
	const {slug} = useParams()
	const {data: channel, error, loading} = useChannel(database, session, slug)
	const {canEdit} = useCanEdit(database, session?.user.id, channel?.id)

	if (loading) return <p>Loading...</p>
	if (error) return <p>{error.details}</p>
	if (!channel) return <p>Channel not found</p>

	return <Channel key={channel.id} channel={channel} database={database} canEdit={canEdit} />
}

function Channel({channel, database, canEdit}) {
	const {data: tracks, setTracks, error} = useTracks(channel.id, database)

	if (error) return <p>{error.details}</p>
	if (!canEdit) return <p>Nop</p>

	return (
		<article key={channel.id}>
			<p>
				<Link to={`/${channel.slug}`}>Back</Link>
			</p>

			<h1>Edit your channel</h1>
			<UpdateForm
				channel={channel}
				onSubmit={(changes) => updateChannel({database, id: channel.id, changes})}
			/>

			<h2>Delete your channel</h2>
			<DeleteForm channel={channel} onSubmit={() => deleteChannel({database, id: channel.id})} />

			<h2>{tracks.length} Tracks</h2>
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
