import useChannels from 'hooks/use-channels'
import {Channels} from 'components/channels'
import ChannelsLayout from 'layouts/channels'

export default function PageChannels({dbSession: {database, session, userChannels}}) {
	const {channels, loading} = useChannels(database)

	if (loading) return <p>Loading...</p>
	if (!channels.length) return <p>No channels</p>

	return (
		<ChannelsLayout userChannels={userChannels}>
			<p>{channels.length} channels</p>
			{channels && <Channels channels={channels} />}
		</ChannelsLayout>
	)
}
