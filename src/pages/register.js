import {useLocation, useSearchParams, Link} from 'react-router-dom'
import {DbSessionContext} from '../contexts/db-session'
import AuthForm from '../components/auth-form'

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
			<p>
				Register a new Radio4000 account
				{isImport && <span>, your data from the old system will be imported when creating your radio channel</span>}
				.
			</p>
			<AuthForm onSubmit={signUp} submitLabel="Register account" />
		</div>
	)
}
