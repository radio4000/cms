import React from 'react'
import {Link} from 'react-router-dom'

export default function LayoutSettings({children}) {
	return (
		<>
			<header>
				<h1>
					Settings
				</h1>
				<nav>
					<Link to="/settings/account">Account</Link>
					<Link to="/settings/channels">Channels.</Link>
				</nav>
			</header>
			<main>
				{children}
			</main>
		</>
	)
}
