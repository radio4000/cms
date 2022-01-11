import {Link} from 'react-router-dom'

export default function AuthRequired({session, children}) {
	if (!session) {
		return (
			<p>
				<Link to={{pathname: `/login`}}>Login</Link> to view this page.
			</p>
		)
	}
	return (
		<>
			{children}
		</>
	)
}
