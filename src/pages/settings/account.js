import {useNavigate} from 'react-router-dom'
import DeleteUserForm from '../../components/delete-user-form.js'
import {Link} from 'react-router-dom'

export default function Account({dbSession}) {
	const {session} = dbSession
	const navigate = useNavigate()

	const handleDeleteUser = () => navigate('/logout')

	return (
		<main>
			<header>
				<h1>
					Settings
				</h1>
				<nav>
					<Link to="/settings/account">Account</Link>
					<Link to="/settings/channels">Channels.</Link>
				</nav>
			</header>
			<p>
				This is your Radio4000 account: <strong>{session?.user?.email}</strong>
			</p>
			<p>Change your password? <Link to="/reset-password">Change</Link></p>
			<p>
				Delete your account <DeleteUserForm onDelete={handleDeleteUser} />
			</p>
		</main>
	)
}
