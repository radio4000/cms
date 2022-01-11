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
				<p>You are logged in and registered as:</p>
				<form disabled={true}>
					<label>
						<span>
							Email:
						</span>
						<input value={session?.user?.email} onChange={() => {}}/>
					</label>
					<label>
						<p>
							Password: <Link to="/reset-password">change</Link>
						</p>
					</label>
				</form>
				<p>
					<Link to="/logout">Log out</Link>
				</p>
			</section>
			<section>
				<header>
					<h2>
						Appearance
					</h2>
				</header>
				Change between light &amp; dark: <ThemeToggleButton></ThemeToggleButton>
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
