import {Link, useNavigate} from 'react-router-dom'
import {DbSessionContext} from '../../contexts/db-session'
import ThemeToggleButton from './theme-toggle-button'
import CommandMenu from './command-menu'
import createCommands from '../../utils/commands'

export default function Nav(props) {
	const navigate = useNavigate()

	return (
		<DbSessionContext.Consumer>
			{({session, userChannel}) => {
				const commands = createCommands({isSignedIn: session, navigate, userChannel})
				return (
					<nav className="Nav">
						<Link to="/">R4</Link>
						{/* {userChannel && <Link to={`/${userChannel.slug}`}>{userChannel.name}</Link>} */}
						{/* <Link to="/channels">Channels</Link> */}
						<CommandMenu commands={commands}></CommandMenu>
						<div className="Nav Nav-push">
							{session ? (
								<>
									<Link to="/settings/account">Account</Link>
									<Link to="/logout">Log out</Link>
								</>
							) : (
								<>
									<Link to="/register">Register</Link>
									<Link to="/login">Login</Link>
								</>
							)}
						</div>
						<ThemeToggleButton></ThemeToggleButton>
					</nav>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
