import {DbSessionContext} from '../contexts/db-session'
import AuthForm from '../components/auth-form'
import ResetPasswordForm from '../components/auth-reset-password-form'
import {useLocation} from 'react-router-dom'

export default function PageLogin() {
	const location = useLocation()
	let from = location.state?.from?.pathname || '/'
	return (
		<DbSessionContext.Consumer>
			{({session, signOut, signIn}) => {
				return session ? (
					<div>
						<p>You are logged in.</p>
						<button onClick={signOut}>Log out</button>
					</div>
				) : (
					<>
						<p>Log in to Radio4000</p>
						<AuthForm onSubmit={signIn} submitLabel="Login" redirectTo={from} />
						<ResetPasswordForm></ResetPasswordForm>
					</>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
