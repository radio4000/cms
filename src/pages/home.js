import {Link} from 'react-router-dom'
import {DbSessionContext} from '../contexts/db-session'

export default function PageHome() {
	return (
		<DbSessionContext.Consumer>
			{({session, userChannel}) => (
				<>
					{!session ? (
						<header>
							<h1>Welcome to the new Radio4000 website!</h1>
						</header>
					) : (
						<>
							{userChannel && <p>You channel is <Link to={`/${userChannel.slug}`}>{userChannel.slug}</Link></p>}
						</>
					)}
				</>
			)}
		</DbSessionContext.Consumer>
	)
}
