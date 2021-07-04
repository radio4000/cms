import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import {SWRConfig} from 'swr'
import fetcher from './utils/fetcher'
import {DbSessionContext} from './contexts/db-session'
import DbSession from './components/db-session'
import Layout from './components/layout'
import LayoutHeader from './components/layout-header'
import PageRegister from './pages/register'
import PageLogin from './pages/login'
import PageLogout from './pages/logout'
import PageAccount from './pages/account'
import PageHome from './pages/home'
import PageNoMatch from './pages/404'
import PageTest from './pages/test'


export default function App() {
	return (
		<SWRConfig value={{fetcher}}>
			<Router>
				<DbSession>
					<DbSessionContext.Consumer>
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
											{session ? <PageAccount session={session}/> : <Redirect to='/login'/>}
										</Route>
										<Route path="/test">
											<PageTest session={session}/>
										</Route>
										<Route path="*">
											<PageNoMatch />
										</Route>
									</Switch>
								</main>
							</Layout>
						)}
					</DbSessionContext.Consumer>
				</DbSession>
			</Router>
		</SWRConfig>
	)
}
