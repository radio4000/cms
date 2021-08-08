import {DbSessionContext} from '../contexts/db-session'
import Auth from '../components/auth-form'

export default function PageRegister() {
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
						<p>Register a new account</p>
						<Auth onSubmit={signUp} submitLabel="Register account"></Auth>
					</div>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
