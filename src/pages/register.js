import {DbSessionContext} from '../contexts/db-session'
import AuthForm from '../components/auth-form'

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
						<AuthForm onSubmit={signUp} submitLabel="Register account" />
					</div>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
