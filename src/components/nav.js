import {Link} from 'react-router-dom'
import {supabase} from '../utils/supabaseClient'

export default function Nav() {
	return (
		<nav className="Nav">
			<Link to="/">Home</Link>
			<button className="Nav-signout" onClick={() => supabase.auth.signOut()}>
				Sign Out
			</button>
		</nav>
	)
}
