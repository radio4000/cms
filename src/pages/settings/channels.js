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

	return (
		<>
			{!loading && channels?.length ? (
				<>
					<h2>Manage your channels</h2>
					<Channels channels={channels} database={database} />
				</>
			) : (
				<>
					<p>You don't have a radio channel yet.</p>
					<Link to="new">Create radio channel</Link>.
				</>
			)}
		</>
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
