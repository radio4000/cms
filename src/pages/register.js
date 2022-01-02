import {useLocation} from 'react-router-dom'
import {DbSessionContext} from '../contexts/db-session'
import AuthForm from '../components/auth-form'

export default function PageRegister() {
	const location = useLocation()
	const isMigration = new URLSearchParams(location.search).get('import')
	return (
		<DbSessionContext.Consumer>
			{({session, signOut, signUp}) => {
				return session ? (
					<div>
						<p>You are already signed in.</p>
						<button onClick={signOut}>Log out</button>
					</div>
				) : (
					<div>
						<p>
							Register a new Radio4000 account
							{isMigration && <span>, your data from the old system will be imported when creating your radio channel</span>}
							.
						</p>
						<AuthForm onSubmit={signUp} submitLabel="Register account" />
					</div>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
