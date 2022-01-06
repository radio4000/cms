import {Link} from 'react-router-dom'
import useChannels from 'hooks/use-channels'
import {Channels} from 'components/channels'

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
			{channels && <Channels channels={channels}/>}
		</div>
	)
}
