import {Link} from 'react-router-dom'

export default function LayoutChannels({userChannels, children}) {
	return (
		<>
			<header>
				{userChannels?.length > 0 && (
					<menu>
						<li>
							<Link to="/channels/me">mine</Link>
						</li>
					</menu>
				)}
			</header>
			<section>{children}</section>
		</>
	)
}
