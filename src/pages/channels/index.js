import {Link} from 'react-router-dom'
import useChannels from '../../hooks/use-channels'

export default function PageChannels({dbSession: {database}}) {
	const {channels, loading} = useChannels(database)
	if (loading)
		return (
			<>
				<h1>Channels</h1>
				<p>Loading</p>
			</>
		)
	return (
		<div>
			<h1>Channels</h1>
			{!channels.length && <p>No channels</p>}
			<p>{channels.length} channels</p>
			<ul>
				{channels.map((channel) => (
					<li key={channel.id}>
						<Link to={`/${channel.slug}`}>{channel.name}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
