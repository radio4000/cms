import {useNavigate, useLocation, Navigate} from 'react-router-dom'
import useUserChannels from '../hooks/use-user-channels.js'
import {createChannel, updateChannel, deleteChannel} from '../utils/crud/channel'
import {CreateForm, UpdateForm, DeleteForm} from '../components/channel-forms'
import DeleteUserForm from '../components/delete-user-form.js'
import {Link} from 'react-router-dom'

export default function Account({dbSession}) {
	const {session, database} = dbSession
	const navigate = useNavigate()
	const location = useLocation()
	const channels = useUserChannels(database, session?.user.id)
	if (!session) return <Navigate to="/login" state={{from: location}}></Navigate>

	const handleDeleteUser = () => navigate('/logout')
	const handleCreate = async (channel) => {
		const {error} = await createChannel({database, channel, user: session.user})
		if (error) return {error}
		window.location.reload()
	}

	return (
		<main>
			<p>
				This is your Radio4000 account: <strong>{session.user.email}</strong>
			</p>

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
		</main>
	)
}

function Channels({channels, database}) {
	return channels.map((channel) => {
		return (
			<article key={channel.id}>
				<h3>
					<Link to={`/${channel.slug}`}>{channel.name}</Link>
				</h3>
				<UpdateForm
					channel={channel}
					onSubmit={(changes) => updateChannel({database, id: channel.id, changes})}
				/>
				<DeleteForm channel={channel} onSubmit={() => deleteChannel({database, id: channel.id})} />
			</article>
		)
	})
}
