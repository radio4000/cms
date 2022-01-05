import {Link} from 'react-router-dom'
import {DbSessionContext} from '../contexts/db-session'

export default function PageHome() {
	return (
		<DbSessionContext.Consumer>
			{({session, userChannel}) => (
				<>
					{!session ? (
						<header>
							<p>Welcome to the new radio4000 website!</p>
						</header>
					) : (
						<>
							{userChannel && <p>You channel is {userChannel.name}</p>}
							{!userChannel && (
								<nav>
									<Link to="/new">Create channel</Link>
									<Link to="/new/import">import channel</Link>
								</nav>
							)}
						</>
					)}
				</>
			)}
		</DbSessionContext.Consumer>
	)
}
