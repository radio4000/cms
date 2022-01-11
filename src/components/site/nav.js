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
			{({session, setUserChannel, userChannel, userChannels}) => {
				const commands = createCommands({isSignedIn: session, navigate, userChannel})
				const handleChannelChanged = ({
					target: {
						name,
						value: selectedChannelSlug
					}
				}) => {
					const selectedChannel = userChannels.find(channel => {
						return channel.slug === selectedChannelSlug
					})
					setUserChannel(selectedChannel)
					navigate(`/${selectedChannelSlug}/`)
				}
				return (
					<>
						<CommandMenu commands={commands}></CommandMenu>
						<menu>
							<li>
								<Link to="/">{RADIO4000_APP_NAME_MINI}</Link>
								{!session && <Link to="/login">login</Link>}

								{session && (
									<>
										<Link to="/account">account</Link>
										{(userChannels?.length) ? (
											<>
												<Link to="/add">add track</Link>
												<UserChannelsSelect
													userChannel={userChannel}
													userChannels={userChannels}
													onChange={handleChannelChanged}
												/>
											</>
										) : null}
									</>
								)}
							</li>
							<li>
								<Link to="/channels">channels</Link>
								{ (!session || (!session && !userChannels?.length)) && (
									<>
										<Link to="/new" end>new</Link>
										<Link to="/new/import">import</Link>
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
