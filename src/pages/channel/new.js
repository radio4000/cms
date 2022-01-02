import {Link} from 'react-router-dom'
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
		<>
			<details>
				<summary>
					Import radio from Radio4000 version 1
				</summary>
				<p>
					Let's <Link to="/new/import">import an existing channel</Link>, from an old radio4000 account.
				</p>
			</details>
			<details>
				<summary>
					Create new radio
				</summary>
				<CreateForm onSubmit={handleCreate}/>
			</details>
		</>
	)
}
