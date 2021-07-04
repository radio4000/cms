import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {SWRConfig} from 'swr'
import {Redirect} from 'react-router-dom'
import {SessionContext} from './contexts/session'
import SessionAuth from './components/SessionAuth'
import Layout from './components/Layout'
import LayoutHeader from './components/LayoutHeader'
import PageRegister from './pages/register'
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
					<SessionContext.Consumer>
						{({session}) => (
							<Layout>
								<LayoutHeader/>
								<main>
									<Switch>
										<Route exact path="/">
											<PageHome/>
										</Route>
										<Route exact path="/register">
											{!session ? <PageRegister/> : <Redirect to='/account'/>}
										</Route>
										<Route exact path="/login">
											{!session ? <PageLogin/> : <Redirect to='/account'/>}
										</Route>
										<Route exact path="/logout">
											{session ? <PageLogout/> : <Redirect to='/login'/>}
										</Route>
										<Route exact path="/account">
											{session ? <PageAccount/> : <Redirect to='/login'/>}
										</Route>
										<Route path="/test">
											<Test session={session}></Test>
										</Route>
										<Route path="*">
											<PageNoMatch />
										</Route>
									</Switch>
								</main>
							</Layout>
						)}
					</SessionContext.Consumer>
				</SessionAuth>
			</Router>
		</SWRConfig>
	)
}
