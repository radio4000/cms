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
								<menu>
									<li>
										<Link to="/new">Create channel</Link>
									</li>
									<li>
										<Link to="/new/import">Import channel</Link>
									</li>
								</menu>
							)}
						</>
					)}
				</>
			)}
		</DbSessionContext.Consumer>
	)
}
