import {SessionContext} from '../contexts/session'

export default function PageHome() {
	return (
		<SessionContext.Consumer>
			{({session}) => {
				return (
					<div>
						Homepage. {session ? 'You are logged-in' : null}
					</div>
				)
			}}
		</SessionContext.Consumer>
	)
}
