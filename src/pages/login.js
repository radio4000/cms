import {DbSessionContext} from '../contexts/db-session'
import Auth from '../components/auth'

export default function PageLogin() {
	return (
		<DbSessionContext.Consumer>
			{({session, logout}) => {
				return session ? (
					<div>
						<p>You are logged in.</p>
						<button onClick={logout}>logout</button>
					</div>
				) : (
					<Auth></Auth>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
