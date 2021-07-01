import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {supabase} from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
import Channel from './Channel'

export default function Home() {
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
			</nav>
			<Switch>
				<Route path="/">
					<Account key={session.user.id} session={session}></Account>
				</Route>
				<Route path="/channel">
					<Channel key={session.user.id} session={session}></Channel>
				</Route>
			</Switch>
		</Router>
	)
}
