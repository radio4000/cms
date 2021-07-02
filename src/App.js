import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {SWRConfig} from 'swr'
import {supabase} from './utils/supabaseClient'
import fetcher from './utils/fetcher'
import Account from './pages/account'
import NoMatch from './pages/404'
import Auth from './components/auth'
import Nav from './components/nav'

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
		<SWRConfig value={{fetcher}}>
		 	<Router>
				<Nav />
				<Switch>
					<Route exact path="/">
						<Account key={session.user.id} session={session}></Account>
					</Route>
					<Route path="*">
						<NoMatch />
					</Route>
				</Switch>
			</Router>
		</SWRConfig>
	)
}
