import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'

import {supabase} from './utils/supabaseClient'
import Layout from './Layout'
import Auth from './components/auth'
import Account from './pages/account'
import NoMatch from './pages/404'
import Nav from './components/nav'

export default function App() {
	const [session, setSession] = useState(null)

	useEffect(() => {
		setSession(supabase.auth.session())

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	return (
		<Router>
			<Layout>
				<header>
					<Nav />
					{!session ? <Auth></Auth> : null}
				</header>
				{session ? (
					<Switch>
						<Route exact path="/">
							<Account key={session.user.id} session={session}></Account>
						</Route>
						<Route path="*">
							<NoMatch />
						</Route>
					</Switch>
				) : null}
			</Layout>
		</Router>
	)
}
