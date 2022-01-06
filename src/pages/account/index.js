import {Link, useNavigate} from 'react-router-dom'
import LayoutAccount from 'layouts/account'
import DeleteUserForm from 'components/delete-user-form'
import ThemeToggleButton from 'components/site/theme-toggle-button'

export default function Account({
	dbSession: {database, session, userChannel}
}) {
	const navigate = useNavigate()
	const handleDeleteUser = () => navigate('/logout')

	return (
		<LayoutAccount>
			<section>
				<header>
					<h2>Session</h2>
				</header>
				<p>
					<Link to="/logout">Log out</Link> your Radio4000 account.
				</p>
			</section>
			<section>
				<header>
					<h2>
						Appearance
					</h2>
				</header>
				Toggle dark/light theme: <ThemeToggleButton></ThemeToggleButton>
			</section>
			<section>
				<header>
					<h2>User</h2>
				</header>
				<p>
					Email: <kbd>{session?.user?.email}</kbd>
				</p>
				<p>
					Password: <Link to="/reset-password">change</Link>
				</p>
			</section>
			<section>
				<header>
					<h2>Delete</h2>
				</header>
				<p>Permanently delete your Radio4000 account? This will wipe your:</p>
				<ul>
					<li>radio channel</li>
					<li>user account & settings</li>
				</ul>
				<DeleteUserForm onDelete={handleDeleteUser}/>
			</section>
		</LayoutAccount>
	)
}
