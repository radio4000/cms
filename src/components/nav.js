import {Link} from 'react-router-dom'
import {DbSessionContext} from '../contexts/db-session'
import ThemeToggleButton from './theme-toggle-button'

export default function Nav() {
	return (
		<DbSessionContext.Consumer>
			{({session}) => {
				return (
					<nav className="Nav">
						<Link to="/">Home</Link>
						<Link to="/channels">Channels</Link>
						<div className="Nav Nav-push">
							{session ? (
								<>
									<Link to="/account">Account</Link>
									<Link to="/logout">Logout</Link>
								</>
							) : (
								<>
									<Link to="/login">Login</Link>
									<Link to="/register">Register</Link>
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
