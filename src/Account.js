import {Link} from 'react-router-dom'
import {supabase} from './supabaseClient'

export default function Account({session}) {
	return (
		<div>
			<h1>Account</h1>
				<input id="email" type="text" value={session.user.email} disabled />
			<p>
				<Link to="channel">Create a channel</Link>
			</p>

			<p>
				<button onClick={() => supabase.auth.signOut()}>Sign Out</button>
			</p>
		</div>
	)
}
