import {useHistory} from 'react-router-dom'
import useUserChannels from '../hooks/use-user-channels.js'
import {createChannel, updateChannel, deleteChannel} from '../utils/crud/channel'
import {CreateForm, UpdateForm, DeleteForm} from '../components/channel-forms'
import DeleteUserForm from '../components/delete-user-form.js'

export default function Account({dbSession}) {
	const history = useHistory()
	const {session, database} = dbSession
	const channels = useUserChannels(database, session.user.id)

	const handleDeleteUser = () => history.push('/logout')

	const handleCreate = async (channel) => {
		const {error} = await createChannel({database, channel, user: session.user})
		if (error) return {error}
		window.location.reload()
	}

	return (
		<main>
			<section>
				<h1>Account</h1>
				<p>This is your Radio4000 account: {session.user.email}</p>

				<DeleteUserForm onDelete={handleDeleteUser} />

				{channels?.length ? (
					<>
					<h2>Manage your channels</h2>
					<Channels channels={channels} database={database} />
					</>
				) : (
					<>
					<h2>Create channel</h2>
					<CreateForm onSubmit={handleCreate}></CreateForm>
					</>
				)}
			</section>
		</main>
	)
}

function Channels({channels, database}) {
	return channels.map((channel) => {
		return (
			<article key={channel.id}>
				<h3>{channel.name}</h3>
				<UpdateForm
					channel={channel}
					onSubmit={(changes) => updateChannel({database, id: channel.id, changes})}
				/>
				<DeleteForm channel={channel} onSubmit={() => deleteChannel({database, id: channel.id})} />
			</article>
		)
	})
}
