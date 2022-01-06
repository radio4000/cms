import {Link} from 'react-router-dom'
import AuthForm from '../components/auth-form'
import ResetPasswordForm from '../components/auth-reset-password-form'
import {useLocation} from 'react-router-dom'

export default function PageLogin({
	dbSession: {session, signIn, signOut}
}) {
	return (
		session ? (
			<div>
				<p>You are logged in.</p>
				<button onClick={signOut}>Log out</button>
			</div>
		) : (
			<div>
				<details open={true}>
					<summary>Log in to Radio4000</summary>
					<AuthForm onSubmit={signIn} submitLabel="Login"/>
				</details>
				<LoginInfo/>
			</div>
		)
	)
}

function LoginInfo() {
	return (
		<>
			<ResetPasswordForm></ResetPasswordForm>
			<details open={false}>
				<summary>Register new account</summary>
				<p>
					<Link to="/register">Register a new account</Link> to create a radio channel.
				</p>
			</details>

			<details open={false}>
				<summary>Import old Radio4000 channel</summary>
				<p>You already have a Radio4000 account, but can't login? Radio4000 moved to a new system.</p>
				<p>
					To import your existing channel and tracks, first <Link to="/register?import=true">register a new account</Link> and follow the import
					steps when creating a new radio channel.
				</p>
			</details>
		</>
	)
}
