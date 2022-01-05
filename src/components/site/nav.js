import {NavLink as Link, useNavigate} from 'react-router-dom'
import {DbSessionContext} from '../../contexts/db-session'
import CommandMenu from './command-menu'
import createCommands from '../../utils/commands'

export default function Nav(props) {
	const navigate = useNavigate()

	return (
		<DbSessionContext.Consumer>
			{({session, userChannel}) => {
				const commands = createCommands({isSignedIn: session, navigate, userChannel})
				return (
					<>
						<CommandMenu commands={commands}></CommandMenu>
						<menu>
							<li>
								<Link to="/">R4</Link>
							</li>
							{userChannel && (
								<li>
									<Link to={`/${userChannel.slug}`}>{userChannel.name}</Link>
								</li>
							)}
							<li>
								{session ? (
									<Link to="/account">Account</Link>
								) : (
									<Link to="/login">Login</Link>
								)}
							</li>
							<li>
								<Link to="/channels">Channels</Link>
							</li>
						</menu>
					</>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
