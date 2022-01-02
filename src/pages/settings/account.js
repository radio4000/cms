import {Link, useNavigate} from 'react-router-dom'
import LayoutSettings from '../../layouts/settings'
import DeleteUserForm from '../../components/delete-user-form.js'

export default function Account({dbSession}) {
	const {session} = dbSession
	const navigate = useNavigate()

	const handleDeleteUser = () => navigate('/logout')

	return (
		<LayoutSettings>
			<p>
				Email: <kbd>{session?.user?.email}</kbd>
			</p>
			<p>
				Password: <Link to="/reset-password">change your password?</Link>
			</p>
			<p>
				Delete your account:
			</p>
			<DeleteUserForm onDelete={handleDeleteUser}/>
		</LayoutSettings>
	)
}
