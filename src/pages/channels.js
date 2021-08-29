import {Link} from 'react-router-dom'
import useChannels from '../hooks/use-channels'

export default function PageChannels({dbSession: {database, session}}) {
	const {channels, loading} = useChannels(database)
	return (
		<div>
			<h1>Channels</h1>
			{loading && <p>Loading</p>}
			{!loading && !channels.length && <p>No channels</p>}
			{channels.map((channel) => (
				<Link key={channel.id} to={channel.slug}>{channel.name}</Link>
			))}
		</div>
	)
}
