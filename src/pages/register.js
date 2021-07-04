import {DbSessionContext} from '../contexts/db-session'
import Auth from '../components/auth'

export default function PageRegister() {
	return (
		<DbSessionContext.Consumer>
			{({session, logout}) => {
				return session ? (
					<div>
						<p>You are logged in.</p>
						<button onClick={logout}>logout</button>
					</div>
				) : (
					<>
						<p>Register a new account</p>
						<Auth></Auth>
					</>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
