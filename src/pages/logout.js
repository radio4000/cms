import {Redirect} from 'react-router-dom'
import {SessionContext} from '../contexts/session'

export default function PageLogout() {
	return (
		<SessionContext.Consumer>
			{(value) => {
				const {session, logout} = value
				console.log(value, session, logout)
				if (session) {
					logout()
					return <Redirect to='/login'/>
				}
			}}
		</SessionContext.Consumer>
	)
}
