import {DbSessionContext} from '../contexts/db-session'
import useSharedState from '../hooks/use-shared-state'

export default function PageHome() {
	return (
		<DbSessionContext.Consumer>
			{({session, database: db}) => (
				<div>
					<h1>Homepage</h1>
					{session ? 'You are logged-in.' : null}
				</div>
			)}
		</DbSessionContext.Consumer>
	)
}
