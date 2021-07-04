import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {SWRConfig} from 'swr'
import fetcher from './utils/fetcher'
import {supabase} from './utils/supabaseClient'
import Account from './pages/account'
import NoMatch from './pages/404'
import Test from './pages/test'
import Layout from './components/layout'
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

	return (
		<SWRConfig value={{fetcher}}>
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
							<Route path="/test">
								<Test session={session}></Test>
							</Route>
							<Route path="*">
								<NoMatch />
							</Route>
						</Switch>
					) : null}
				</Layout>
			</Router>
		</SWRConfig>
	)
}
