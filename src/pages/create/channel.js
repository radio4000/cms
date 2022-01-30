import {Link, useNavigate} from 'react-router-dom'
import ChannelsLayout from 'layouts/channels'
import {CreateForm} from 'components/channels/forms'
import {createChannel} from 'utils/crud/channel'
// import LoginRequired from 'components/login-required'

export default function PageChannelNew({dbSession: {session, database}}) {
	const navigate = useNavigate()

	const handleCreate = async (channel) => {
		const {data, error} = await createChannel({database, channel, user: session?.user})
		if (error) return {error}
		navigate('/' + data.channel.slug)
	}

	return (
		<ChannelsLayout>
			{!session?.user && <p><Link to="/login?redirect=create/channel">Please log in first</Link></p>}
			{/* <p>First {!session?.user && <LoginRequired message="to create (or import) a radio channel" />}</p> */}
			<CreateForm onSubmit={handleCreate} disabled={!session?.user} />
		</ChannelsLayout>
	)
}
