import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import {SWRConfig} from 'swr'
import fetcher from './utils/fetcher'
import {DbSessionContext} from './contexts/db-session'
import DbSession from './components/db-session'
import Layout from './components/layout'
import LayoutHeader from './components/layout-header'
import PageChannels from './pages/channels'
import PageChannel from './pages/channel'
import PageRegister from './pages/register'
import PageLogin from './pages/login'
import PageLogout from './pages/logout'
import PageAccount from './pages/account'
import PageHome from './pages/home'
import PageNoMatch from './pages/404'
import PageTest from './pages/test'
import PageAdd from './pages/add'
import PageResetPassword from './pages/account/reset-password'

export default function App() {
	return (
		<SWRConfig value={{fetcher}}>
			<Router>
				<DbSession>
					<DbSessionContext.Consumer>
						{(dbSession) => {
							const {session} = dbSession
							return (
								<Layout>
									<LayoutHeader />
									<main>
										<Switch>
											<Route exact path="/">
												<PageHome />
											</Route>
											<Route exact path="/channels">
												<PageChannels dbSession={dbSession} />
											</Route>
											<Route exact path="/register">
												{!session ? <PageRegister /> : <Redirect to="/account" />}
											</Route>
											<Route exact path="/login">
												{!session ? <PageLogin /> : <Redirect to="/account" />}
											</Route>
											<Route exact path="/logout">
												{session ? <PageLogout /> : <Redirect to="/login" />}
											</Route>
											<Route exact path="/account/reset-password">
												{session ? (
													<PageResetPassword dbSession={dbSession} />
												) : (
													<Redirect to="/login" />
												)}
											</Route>
											<Route exact path="/account">
												{session ? <PageAccount dbSession={dbSession} /> : <Redirect to="/login" />}
											</Route>
											<Route path="/test">
												<PageTest session={session} />
											</Route>
											<Route path="/add">
												<PageAdd dbSession={dbSession}></PageAdd>
											</Route>
											<Route path="/:slug">
												<PageChannel dbSession={dbSession}></PageChannel>
											</Route>
											<Route path="*">
												<PageNoMatch />
											</Route>
										</Switch>
									</main>
								</Layout>
							)
						}}
					</DbSessionContext.Consumer>
				</DbSession>
			</Router>
		</SWRConfig>
	)
}
