import {Redirect} from 'react-router-dom'
import {DbSessionContext} from '../contexts/db-session'

export default function PageLogout() {
	return (
		<DbSessionContext.Consumer>
			{({session, logout}) => {
				if (session) {
					logout()
					return <Redirect to='/login'/>
				}
			}}
		</DbSessionContext.Consumer>
	)
}
