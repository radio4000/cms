import useChannels from '../hooks/use-channels'

const PageChannels = ({dbSession: {database}}) => {
	const channels = useChannels(database)

	if (!database) return null

	if (!channels.length) return <p>No channels</p>
	return channels.map(channel => {
		return (
			<article key={channel.id}>
				<header>
					<span>{channel.name}</span>
					{' '}
					<i>@{channel.slug}</i>
				</header>
			</article>
		)
	})

}

export default PageChannels
