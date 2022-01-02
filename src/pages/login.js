import {Link} from 'react-router-dom'
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
						<br />
						<ResetPasswordForm></ResetPasswordForm>
						<details>
							<summary>
								Old radio4000 account?
							</summary>
							<p>
								You already have a radio4000 account, but you can't login?
							</p>
							<p>
								Radio4000 moved to a new system, to import your existing data, <Link to="/register?import=true">register a new account</Link> and follow the import steps when creating a new radio channel.
							</p>
						</details>
					</>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
