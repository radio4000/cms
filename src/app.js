import {BrowserRouter, Routes, Route} from 'react-router-dom'
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
import PageResetPassword from './pages/reset-password'
import PageChannelEdit from './pages/channel/edit'

export default function App() {
	return (
		<SWRConfig value={{fetcher}}>
			<BrowserRouter>
				<DbSession>
					<DbSessionContext.Consumer>
						{(dbSession) => {
							const {session} = dbSession
							return (
								<Layout>
									<LayoutHeader />
									<main>
										<Routes>
											<Route path="/" element={<PageHome />} />
											{/* User */}
											<Route path="register" element={<PageRegister />} />
											<Route path="login" element={<PageLogin />} />
											<Route path="logout" element={<PageLogout />} />
											<Route path="account" element={<PageAccount dbSession={dbSession} />}></Route>
											<Route
												path="reset-password"
												element={<PageResetPassword dbSession={dbSession} />}
											/>
											{/* Channels */}
											<Route path="channels" element={<PageChannels dbSession={dbSession} />} />
											<Route path=":slug" element={<PageChannel dbSession={dbSession} />}></Route>
											<Route
												path=":slug/edit"
												element={<PageChannelEdit dbSession={dbSession} />}
											/>
											{/* Other pages */}
											<Route path="add" element={<PageAdd dbSession={dbSession} />} />
											<Route path="test" element={<PageTest session={session} />} />
											<Route path="*" element={<PageNoMatch />} />
										</Routes>
									</main>
								</Layout>
							)
						}}
					</DbSessionContext.Consumer>
				</DbSession>
			</BrowserRouter>
		</SWRConfig>
	)
}
