import {Link} from 'react-router-dom'
import {DbSessionContext} from '../contexts/db-session'

export default function PageHome() {
	return (
		<DbSessionContext.Consumer>
			{({session, userChannel}) => (
				<>
					{!session ? (
						<header>
							<p>Welcome to the new Radio4000 website!</p>
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
