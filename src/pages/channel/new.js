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
			<p>Do you already have a channel you want to keep?</p>
			<details>
				<summary>Yes, I want to keep my radio</summary>
				<p>
					<Link to="/new/import">Import channel from the old Radio4000</Link>
				</p>
			</details>
			<details>
				<summary>No, create a new radio</summary>
				<CreateForm onSubmit={handleCreate} />
			</details>
		</>
	)
}
