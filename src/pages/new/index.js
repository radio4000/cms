import {createChannel} from 'utils/crud/channel'
import LayoutNewChannel from 'layouts/new-channel'
import {CreateForm} from 'components/channel-forms'
import LoginRequired from 'components/login-required'

export default function PageChannelNew({dbSession: {session, database}}) {
	const handleCreate = async (channel) => {
		const {error} = await createChannel({database, channel, user: session?.user})
		if (error) return {error}
		// Reload because we are react noobs.
		window.location.reload()
	}

	return (
		<LayoutNewChannel>
			<h1>Create channel</h1>
			<CreateForm onSubmit={handleCreate} disabled={!session?.user}/>
			{!session?.user && <LoginRequired message="to create (or import) a radio channel"/>}
		</LayoutNewChannel>
	)
}
