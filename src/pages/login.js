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
							<summary>Log in to Radio4000</summary>
							<AuthForm onSubmit={signIn} submitLabel="Login" redirectTo={from} />
						</details>

						<ResetPasswordForm></ResetPasswordForm>

						<details open={true}>
							<summary>Don't have an account yet?</summary>
							<p>
								<Link to="/register">Register a new account</Link> to create a radio channel.
							</p>
						</details>

						<details open={true}>
							<summary>Import old Radio4000 channel</summary>
							<p>You already have a Radio4000 account, but can't login? Radio4000 moved to a new system.</p>
							<p>
								To import your existing channel and tracks, first <Link to="/register?import=true">register a new account</Link> and follow the import
								steps when creating a new radio channel.
							</p>
						</details>
					</>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
