import {NavLink} from 'react-router-dom'
import useChannels from 'hooks/use-channels'
import {Channels} from 'components/channels'

export default function PageChannels({
	dbSession: {database, session}
}) {
	const {channels, loading} = useChannels(database)
	if (loading)
		return (
			<>
				<h1>Channels</h1>
				<p>Loading</p>
			</>
		)
	return (
		<>
			<header>
				<h1>
					Channels
				</h1>
				<menu>
					<li>
						<NavLink to="/channels">all channels</NavLink>
						{session && <NavLink to="/channels">my favorites</NavLink>}
					</li>
				</menu>
			</header>
			{channels && channels.length ? (
				<>
					<p>{channels.length} channels</p>
					{channels && <Channels channels={channels}/>}
				</>
			) : (
				<p>No channels</p>
			)}
		</>
	)
}
