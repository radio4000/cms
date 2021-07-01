import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {supabase} from './utils/supabaseClient'
import Account from './pages/account'
import NoMatch from './pages/404'
import Auth from './components/auth'

export default function App() {
	const [session, setSession] = useState(null)

	useEffect(() => {
		setSession(supabase.auth.session())

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	// When you're not signed in, block and show auth.
	if (!session) return <Auth></Auth>

	return (
		<Router>
			<nav>
				<Link to="/">Home</Link>
				<button onClick={() => supabase.auth.signOut()}>Sign Out</button>
			</nav>
			<Switch>
				<Route exact path="/">
					<Account key={session.user.id} session={session}></Account>
				</Route>
				<Route path="*">
					<NoMatch />
				</Route>
			</Switch>
		</Router>
	)
}
