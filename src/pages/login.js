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
						<details open={true}>
							<summary>
								Log in to Radio4000
							</summary>
							<AuthForm onSubmit={signIn} submitLabel="Login" redirectTo={from} />
							<br />
						</details>
						<details open={true}>
							<summary>
								Import old radio4000 account?
							</summary>
							<p>
								You already have a radio4000 account, but you can't login?
							</p>
							<p>
								Radio4000 moved to a new system, to import your existing data, <Link to="/register?import=true">register a new account</Link> and follow the import steps when creating a new radio channel.
							</p>
						</details>
						<ResetPasswordForm></ResetPasswordForm>
						<details open={true}>
							<summary>
								Register new account
							</summary>
							<p>
								You don't yet have an account, <Link to="/register">register</Link>, to create a radio channel.
							</p>
						</details>
					</>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
