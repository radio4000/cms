import {Link, useNavigate} from 'react-router-dom'
import AuthForm from 'components/auth-form'
import ResetPasswordForm from 'components/auth-reset-password-form'

export default function PageLogin(props) {
	const {
		dbSession: {database, session, signIn, signOut},
	} = props
	const {auth} = database
	const onResetPassword = auth?.api?.resetPasswordForEmail
	const navigate = useNavigate()

	const handleSignIn = async (data) => {
		let res
		try {
			res = await signIn(data)
			/* always navigate to previous page the user was visiting,
				after sign in  */
			if (!res.error) navigate(-1)
		} catch (error) {
			console.log('Error login-in', error)
		}
		return res
	}
	return !session ? (
		<>
			{/* <details open={true}> */}
			{/* 	<summary>Log in to Radio4000</summary> */}
			{/* </details> */}
			{/* <br /> */}
				<AuthForm onSubmit={handleSignIn} submitLabel="Log in" />
			<LoginInfo onResetPassword={onResetPassword} />
		</>
	) : (
		<>
			<p>You are logged in.</p>
			<button onClick={signOut}>Log out</button>
		</>
	)
}

function LoginInfo({onResetPassword}) {
	return (
		<>
			<ResetPasswordForm onResetPassword={onResetPassword} />

			<details>
				<summary>Don't have an account?</summary>
				<p>
					<Link to="/register">Register</Link> to create a radio channel.
				</p>
			</details>

			<details>
				<summary>Coming from the previous Radio4000 site?</summary>
				<ul>
					<li>Can't log in?</li>
					<li>Already have a channel from the old site?</li>
				</ul>
				<p>
					<Link to="/create/channel/import">Follow the import steps</Link> to transfer your old
					radio.{' '}
				</p>
			</details>
		</>
	)
}
