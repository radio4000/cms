import {NavLink as Link, useNavigate} from 'react-router-dom'
import config from 'config'
import {DbSessionContext} from 'contexts/db-session'
import CommandMenu from 'components/site/command-menu'
import createCommands from 'utils/commands'

const {
	RADIO4000_APP_NAME_MINI
} = config

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
								<Link to="/">{RADIO4000_APP_NAME_MINI}</Link>
								{session ? (
									<>
										<Link to="/account/">account</Link>
										<Link to="/logout">logout</Link>
									</>
								) : (
									<Link to="/login/">login</Link>
								)}
							</li>
							<li>
								<Link to="/channels/">channels</Link>
								{userChannel && (
									<>
										<Link to={`/${userChannel.slug}/`}>{userChannel.name}</Link>
										<Link to="/add/">add track</Link>
									</>
								)}
								{ session && !userChannel && (
									<>
										<Link to="/new/">create</Link>
										<Link to="/new/import/">import</Link>
									</>
								)}
							</li>
						</menu>
					</>
				)
			}}
		</DbSessionContext.Consumer>
	)
}
