import {Link} from 'react-router-dom'
import {DbSessionContext} from '../contexts/db-session'

export default function PageHome() {
	return (
		<DbSessionContext.Consumer>
			{({session, userChannel}) => (
				<>
					<header>
						<p>
							Welcome to the new radio4000 website!
						</p>
					</header>
					<main>
						{session && (
							<>
								<p>You are signed in as {session.user.email}.</p>
								{userChannel && (
									<p>
										You channel is {userChannel.title}
									</p>
								)}
								{!userChannel && (
									<p>
										You don't have a channel yet, <Link to="/new">create one</Link>.
									</p>
								)}
							</>
						)}
						{!session && (
							<>
								<aside>
									<h2>
										New user?
									</h2>
									<p>
										If you don't already have a radio4000 account and channel, you can always <Link to="/register">register</Link> for free!
									</p>
								</aside>
								<aside>
									<h2>
										You already have a radio4000 channel?
									</h2>
									<p>
										Radio4000 moved to a new system (yay!). If you used to have a radio channel on the <a href="https://v1.radio4000.com">version 1 of radio4000</a>, your data is not lost!
									</p>
									<p>
										To import your data in the new system:
									</p>
									<ul>
										<li>
											<Link to="/register?import=true">Register a new account</Link>
										</li>
										<li>
											Follow the import steps when creating a new channel
										</li>
										<li>
											That is all, we hope you'll enjoy!
										</li>
									</ul>
								</aside>
							</>
						)}
					</main>
				</>
			)}
		</DbSessionContext.Consumer>
	)
}
