import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {SWRConfig} from 'swr'
import SessionAuth from './components/SessionAuth'
import Layout from './components/Layout'
import LayoutHeader from './components/LayoutHeader'
import PageLogin from './pages/login'
import PageLogout from './pages/logout'
import PageAccount from './pages/account'
import PageHome from './pages/home'
import PageNoMatch from './pages/404'


export default function App() {
	return (
		<SWRConfig value={{fetcher}}>
			<Router>
				<SessionAuth>
					<Layout>
						<LayoutHeader/>
						<main>
							<Switch>
								<Route exact path="/">
									<PageHome/>
								</Route>
								<Route exact path="/login">
									<PageLogin/>
								</Route>
								<Route exact path="/logout">
									<PageLogout/>
								</Route>
								<Route exact path="/account">
									<PageAccount/>
								</Route>
								<Route path="/test">
									<Test></Test>
								</Route>
								<Route path="*">
									<PageNoMatch />
								</Route>
							</Switch>
						</main>
					</Layout>
				</SessionAuth>
			</Router>
		</SWRConfig>
	)
}
