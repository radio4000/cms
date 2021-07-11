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

	return (
		<main>
			<section>
				{channels?.length ? (
					channels.map(channel => {
						return (
							<article key={channel.id}>
								<p>{channel.name}</p>
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
						<p>
							You don't have a channel yet
						</p>
						<CreateForm
							onSubmit={(updates) => {createChannel({
								database,
								channel: updates,
								user: session.user
							})}}>
						</CreateForm>
					</article>
				)}
			</section>
			<DeleteUserForm onDelete={handleDeleteUser}></DeleteUserForm>
		</main>
	)
}
