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
					<Channels channels={userChannels}/>
				</>
			) : (
				<>
					<p>You don't have a radio channel yet.</p>
					<menu>
						<li>
							<Link to="/new">create new radio channel</Link>
						</li>
						<li>
							<Link to="/new/import">import radio channel</Link> from the previous Radio4000 versions
						</li>
					</menu>
				</>
			)}
		</LayoutAccount>
	)
}
