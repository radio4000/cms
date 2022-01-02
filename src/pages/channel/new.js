import {CreateForm} from '../../components/channel-forms'
import {createChannel} from '../../utils/crud/channel'

export default function PageChannelNew({dbSession}) {
	const {session, database} = dbSession

	const handleCreate = async (channel) => {
		const {error} = await createChannel({database, channel, user: session.user})
		if (error) return {error}
		window.location.reload()
	}

	return (
		<CreateForm onSubmit={handleCreate}/>
	)
}
