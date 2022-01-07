import {useLocation, useSearchParams, Link} from 'react-router-dom'
import {DbSessionContext} from 'contexts/db-session'
import AuthForm from 'components/auth-form'
import LoginRequired from 'components/login-required'

export default function PageRegister({dbSession: {session, signUp}}) {
	const location = useLocation()
	const [searchParams, setSearchParams] = useSearchParams();
	const isImport = searchParams.get('import')
	return session ? (
		<div>
			<p>
				You are logged in{', '}
				{ isImport ? (
						<Link to={isImport ? '/new/import' : '/new'}>import radio</Link>
				) : (
						<Link to={isImport ? '/new/import' : '/new'}>create radio</Link>
					)}
				{'.'}
			</p>
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
					<LoginRequired
					importChannel={true}
					message="if you already have an account"/>
				</p>
			</header>
			<p>
				{isImport && <i>Your radio channel from the previous system can be imported after creating an account.</i>}
			</p>
			<AuthForm onSubmit={signUp} submitLabel="Register account" />
		</div>
	)
}
