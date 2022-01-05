import {Link} from 'react-router-dom'
import {CreateForm} from '../../components/channel-forms'
import {createChannel} from '../../utils/crud/channel'
import LayoutNewChannel from '../../layouts/new-channel'

export default function PageChannelNew({dbSession}) {
	const {session, database} = dbSession

	const handleCreate = async (channel) => {
		const {error} = await createChannel({database, channel, user: session.user})
		if (error) return {error}
		// Reload because we are react noobs.
		window.location.reload()
	}

	return (
		<LayoutNewChannel>
			<CreateForm onSubmit={handleCreate} />
		</LayoutNewChannel>
	)
}
