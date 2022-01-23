import {Link, NavLink} from 'react-router-dom'
import ChannelAvatar from 'components/channels/avatar'
import Tracks from 'components/tracks'
import useTracks from 'hooks/use-tracks'

export default function Channel({channel, database, canEdit}) {
	const {data: tracks, setTracks, error} = useTracks(channel.id, database)
	if (error) return <p>{error.details}</p>
	return (
		<article>
			<header>
				<menu>
					<li>
						<NavLink to={`/${channel.slug}/`}>@{channel.slug}</NavLink>
						{canEdit && <Link to={`/${channel.slug}/edit`}>edit</Link>}
					</li>
				</menu>
				<div style={{maxWidth: '100px'}}>
					<ChannelAvatar channel={channel} />
				</div>
				<h1>{channel.name}</h1>
				<p>{channel.description}</p>
			</header>

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
