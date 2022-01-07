import {Link} from 'react-router-dom'
import AuthForm from 'components/auth-form'
import ResetPasswordForm from 'components/auth-reset-password-form'
import {useLocation} from 'react-router-dom'

export default function PageLogin({
	dbSession: {database, session, signIn, signOut}
}) {
	const {auth} = database
	const onResetPassword = auth?.api?.resetPasswordForEmail
	return (
		!session ? (
			<>
				<details open={true}>
					<summary>Log in to Radio4000</summary>
					<AuthForm onSubmit={signIn} submitLabel="Login"/>
				</details>
				<LoginInfo onResetPassword={onResetPassword}/>
			</>
		) : (
			<>
				<p>You are logged in.</p>
				<button onClick={signOut}>Log out</button>
			</>
		)
	)
}

function LoginInfo({onResetPassword}) {
	return (
		<>
			<ResetPasswordForm onResetPassword={onResetPassword}/>
			<details open={false}>
				<summary>Register new account</summary>
				<p>
					<Link to="/register">Register a new account</Link> to create a radio channel.
				</p>
			</details>

			<details open={false}>
				<summary>Import old Radio4000 channel</summary>
				<p>You already have a channel from the previous version of radio4000, and you can't login to the new system?</p>
				<p>
					Follow the <Link to="/new/import">import</Link> steps.
				</p>
			</details>
		</>
	)
}
