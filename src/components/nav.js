import {Link} from 'react-router-dom'
import {supabase} from '../utils/supabaseClient'
import ThemeToggleButton from './theme-toggle-button'

export default function Nav() {
	return (
		<nav className="Nav">
			<Link to="/">Home</Link>
			<ThemeToggleButton></ThemeToggleButton>
			<button className="Nav-signout" onClick={() => supabase.auth.signOut()}>
				Sign Out
			</button>
		</nav>
	)
}
