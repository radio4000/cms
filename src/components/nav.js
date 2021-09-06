import {Link, withRouter} from 'react-router-dom'
import {DbSessionContext} from '../contexts/db-session'
import ThemeToggleButton from './theme-toggle-button'
import CommandMenu from './command-menu'
import createCommands from '../utils/commands'

function Nav(props) {
	return (
		<DbSessionContext.Consumer>
			{({session}) => {
				const commands = createCommands({isSignedIn: session, history: props.history})
				return (
					<nav className="Nav">
						<Link to="/">Home</Link>
						<Link to="/channels">Channels</Link>
						<CommandMenu commands={commands}></CommandMenu>
						<div className="Nav Nav-push">
							{session ? (
								<>
									<Link to="/account">Account</Link>
									<Link to="/logout">Logout</Link>
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

export default withRouter(Nav)
