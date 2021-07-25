import {Redirect} from 'react-router-dom'
import {DbSessionContext} from '../contexts/db-session'

export default function PageLogout() {
	return (
		<DbSessionContext.Consumer>
			{({session, signOut}) => {
				if (session) {
					signOut()
					return <Redirect to='/login'/>
				}
			}}
		</DbSessionContext.Consumer>
	)
}
