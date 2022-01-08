import React from 'react'
import {Link} from 'react-router-dom'

export default function LoginRequired({
	message = '',
	register = false,
	importChannel = false,
}) {
	const path = register ? '/register/' : '/login/'
	return (
		<small>
			<i>
				<Link to={path}>
					{register ? 'register' : 'login'}
				</Link>
				{' '}
				into the new r4
				{!message ? `.` : (
					`, ${message}.`
				)}
			</i>
		</small>
	)
}
