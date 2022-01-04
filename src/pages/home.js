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
							{userChannel && <p>You channel is {userChannel.title}</p>}
							{!userChannel && (
								<>
									<p>Welcome.</p>
									<p>
										<Link to="/new">Create a radio channel</Link>?
									</p>
									<p>You will also be able to import your radio from the old Radio4000.</p>
								</>
							)}
						</>
					)}
				</>
			)}
		</DbSessionContext.Consumer>
	)
}
