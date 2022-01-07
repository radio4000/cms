import {NavLink as Link, useNavigate} from 'react-router-dom'
import config from 'config'
import {DbSessionContext} from 'contexts/db-session'
import CommandMenu from 'components/site/command-menu'
import createCommands from 'utils/commands'
import {UserChannelsSelect} from 'components/channels'

const {
	RADIO4000_APP_NAME_MINI
} = config

export default function Nav(props) {
	const navigate = useNavigate()

	return (
		<DbSessionContext.Consumer>
			{({session, userChannel, userChannels}) => {
				const commands = createCommands({isSignedIn: session, navigate, userChannel})
				const handleChannelChanged = ({
					target: {
						name,
						value: selectedChannelSlug
					}
				}) => {
					const selectedChannel = userChannels.find(channel => {
						console.log(channel.slug, selectedChannelSlug)
						return channel.slug === selectedChannelSlug
					})
					userChannel.set(selectedChannel)
					navigate(`/${selectedChannelSlug}`)
				}
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
										<UserChannelsSelect
										userChannel={userChannel}
										userChannels={userChannels}
										onChange={handleChannelChanged}
										/>
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
