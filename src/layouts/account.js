import React from 'react'
import {NavLink as Link} from 'react-router-dom'

export default function LayoutAccount({children}) {
	return (
		<>
			<header>
				<menu>
					<li>
						<Link to="/account">Account</Link>
						<Link to="/logout">
							<small>
								(logout)
							</small>
						</Link>
					</li>
					<li>
						<Link to="/account/channels">My channels</Link>
					</li>
				</menu>
			</header>
			<main>
				{children}
			</main>
		</>
	)
}
