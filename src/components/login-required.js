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
					{register ? 'register' : 'log in'}
				</Link>
				{' '}
				into the new R4
				{!message ? `.` : (
					`, ${message}.`
				)}
			</i>
		</small>
	)
}
