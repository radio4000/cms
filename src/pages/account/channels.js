import {Link} from 'react-router-dom'
import LayoutAccount from 'layouts/account'
import Channels from 'components/channels'

export default function Account({
	dbSession: {database, session, userChannels}
}) {

	return (
		<LayoutAccount>
			{userChannels?.length ? (
				<>
					<h2>My channels</h2>
					<Channels channels={userChannels}/>
				</>
			) : (
				<>
					<p>You don't have a radio channel yet.</p>
					<menu>
						<li>
							<Link to="/channels/create">create new radio channel</Link>
						</li>
						<li>
							<Link to="/channels/import">import radio channel</Link> from the previous Radio4000 versions
						</li>
					</menu>
				</>
			)}
		</LayoutAccount>
	)
}
