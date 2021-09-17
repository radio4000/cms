import {DbSessionContext} from '../contexts/db-session'

export default function PageHome() {
	return (
		<DbSessionContext.Consumer>
			{({session, database: db}) => (
				<div>
					<h1>Welcome home</h1>
					{session && <p>You are signed in as {session.user.email}.</p>}
					<p>Press <kbd>Command/Ctrl+K</kbd> to open the menu.</p>
				</div>
			)}
		</DbSessionContext.Consumer>
	)
}
