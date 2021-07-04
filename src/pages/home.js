import {DbSessionContext} from '../contexts/db-session'

export default function PageHome() {
	return (
		<DbSessionContext.Consumer>
			{({session, database: db}) => (
				<div>
					Homepage. {session ? 'You are logged-in' : null}
				</div>
			)}
		</DbSessionContext.Consumer>
	)
}
