import {Link, NavLink, useParams} from 'react-router-dom'
import Tracks from 'components/tracks'
import useChannel from 'hooks/use-channel'
import useTracks from 'hooks/use-tracks'
import useCanEdit from 'hooks/use-can-edit'

export default function PageChannels({dbSession: {database, session, userChannels}}) {
	const {slug} = useParams()
	const {data: channel, error, loading} = useChannel(database, slug)
	const canEdit = useCanEdit(userChannels, channel)

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

function Channel({channel, database, canEdit}) {
	const {data: tracks, setTracks, error} = useTracks(channel.id, database)
	if (error) {
		return <p>{error.details}</p>
	}
	return (
		<article key={channel.id}>
			<header>
				<menu>
					<li>
						<small>
							<NavLink to={`/${channel.slug}/`}>{channel.slug}</NavLink>
							{canEdit && (
								<Link to={`/${channel.slug}/edit`}>
									<i>
										edit
									</i>
								</Link>
							)}
						</small>
					</li>
				</menu>
				<h1>
					<span>{channel.name}</span>
				</h1>
				<div>
					{channel.description}
				</div>
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
