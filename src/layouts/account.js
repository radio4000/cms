import React from 'react'
import {NavLink as Link} from 'react-router-dom'

export default function LayoutAccount({children}) {
	return (
		<>
			<header>
				<h1>
					Account
				</h1>
				<menu>
					<li>
						<Link to="/account/" exact={true}>Account</Link>
					</li>
					<li>
						<Link to="/account/channels/">Channels</Link>
					</li>
				</menu>
			</header>
			<main>
				{children}
			</main>
		</>
	)
}
