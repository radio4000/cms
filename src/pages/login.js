import {DbSessionContext} from '../contexts/db-session'
import Auth from '../components/auth-form'
import ResetPasswordForm from '../components/auth-reset-password-form'

export default function PageLogin() {
	return (
		<DbSessionContext.Consumer>
			{({session, signOut, signIn}) => {
				return session ? (
					<div>
						<p>You are logged in.</p>
						<button onClick={signOut}>logout</button>
					</div>
				) : (
					<>
						<p>Log in to Radio4000</p>
						<Auth onSubmit={signIn} submitLabel="Login" />
						<ResetPasswordForm></ResetPasswordForm>
					</>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
