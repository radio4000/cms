import {Navigate} from 'react-router-dom'
import {DbSessionContext} from '../contexts/db-session'

export default function PageLogout() {
	return (
		<DbSessionContext.Consumer>
			{({session, signOut}) => {
				if (session) {
					signOut()
					return <Navigate to='/login'/>
				}
			}}
		</DbSessionContext.Consumer>
	)
}
