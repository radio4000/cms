import {useNavigate, useLocation} from 'react-router-dom'
import useUserChannels from '../../hooks/use-user-channels.js'
import {createChannel} from '../../utils/crud/channel'
import {CreateForm} from '../../components/channel-forms'
import DeleteUserForm from '../../components/delete-user-form.js'
import {Link} from 'react-router-dom'

export default function Account({dbSession}) {
	const {session, database} = dbSession
	const navigate = useNavigate()
	const location = useLocation()
	const {channels, loading, error} = useUserChannels(database, session?.user.id)

	if (error) return <p>{error}</p>

	if (!session)
		return (
			<p>
				Access denied.{' '}
				<Link to="/login" state={{from: location}}>
					Log in
				</Link>
			</p>
		)

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
			<p>Change your password? <Link to="/reset-password">Change</Link></p>
			<p>Import old radio4000? <Link to="/account/migration">Migrate</Link></p>
			<hr />

			{!loading && channels?.length ? (
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
			</article>
		)
	})
}
