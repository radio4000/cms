import React from 'react'
import {NavLink as Link} from 'react-router-dom'

export default function LayoutSettings({children}) {
	return (
		<>
			<header>
				<h1>
					Create new channel
				</h1>
				<menu>
					<li>
						<Link to="/new" exact={true}>New channel</Link>
					</li>
					<li>
						<Link to="/new/import">Import channel</Link>
					</li>
				</menu>
			</header>
			<main>
				{children}
			</main>
		</>
	)
}
