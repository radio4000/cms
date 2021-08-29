import {DbSessionContext} from '../contexts/db-session'

export default function PageHome() {
	return (
		<DbSessionContext.Consumer>
			{({session, database: db}) => (
				<div>
					<h1>Welcome</h1>
					{session && <p>You are signed in as {session.user.email}.</p>}
				</div>
			)}
		</DbSessionContext.Consumer>
	)
}
