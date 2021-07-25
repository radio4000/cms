import {useHistory} from 'react-router-dom'
import useUserChannels from '../hooks/use-user-channels.js'
import {
	createChannel,
	updateChannel,
	deleteChannel
} from '../utils/crud/channel'
import {
	CreateForm,
	UpdateForm,
	DeleteForm
} from '../components/channel-forms'
import DeleteUserForm from '../components/delete-user-form.js'

export default function Account({dbSession}) {
	const history = useHistory()
	const {session, database} = dbSession
	const userId = session.user.id
	const channels = useUserChannels(database, userId)

	const handleDeleteUser = () => history.push('/logout')

	const handleCreate = async (channel) => {
		const {error} = await createChannel({database, channel, user: session.user})
		if (!error) window.location.reload()
	}

	return (
		<main>
			<section>
				<h1>Account</h1>
				<p>This is your Radio4000 account: {session.user.email}</p>

				<DeleteUserForm onDelete={handleDeleteUser}></DeleteUserForm>

				{channels?.length ? (
					channels.map(channel => {
						return (
							<article key={channel.id}>
								<h2>Manage your channel: {channel.name} (@{channel.slug})</h2>
								<UpdateForm
									channel={channel}
									onSubmit={(updates) => updateChannel({
										database,
										channel: updates
									})}
								/>
								<DeleteForm
									channel={channel}
									onSubmit={(updates) => deleteChannel({
										database,
										channel: updates
									})}
								/>
							</article>
						)
					})
				) : (
					<article>
						<CreateForm onSubmit={handleCreate}></CreateForm>
					</article>
				)}
			</section>
		</main>
	)
}
