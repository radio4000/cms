import {Link} from 'react-router-dom'
import AuthForm from 'components/auth-form'
import LoginRequired from 'components/login-required'

export default function PageRegister({dbSession: {session, signUp}}) {
	return session ? (
		<div>
			<p>
				You are logged in.
			</p>
			<menu>
				<li>
					<Link to={'/channels/create'}>create radio</Link>
					<Link to={'/channels/import'}>import radio</Link>
				</li>
			</menu>
		</div>
	) : (
		<div>
			<header>
				<h1>
					Register new account
				</h1>
				<p>
					If you haven't got an account or radio channel yet, you're welcome to join!
				</p>
				<p>
					<small>You can also{' '}</small>
					<LoginRequired
					message="if you already have an account"/>
				</p>
			</header>
			<p>
				<i>Your radio channel from the previous system can be imported after creating an account.</i>
			</p>
			<AuthForm onSubmit={signUp} submitLabel="Register account" />
		</div>
	)
}
