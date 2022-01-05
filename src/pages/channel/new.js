import {Link} from 'react-router-dom'
import {CreateForm} from '../../components/channel-forms'
import {createChannel} from '../../utils/crud/channel'

export default function PageChannelNew({dbSession}) {
	const {session, database} = dbSession

	const handleCreate = async (channel) => {
		const {error} = await createChannel({database, channel, user: session.user})
		if (error) return {error}
		// Reload because we are react noobs.
		window.location.reload()
	}

	return (
		<>
			<header>
				<nav>
					<Link to="/new">
						<span>New channel</span>
					</Link>
					<Link to="/new/import">Import from old Radio4000</Link>
				</nav>
			</header>
			<CreateForm onSubmit={handleCreate} />
		</>
	)
}
