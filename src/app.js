import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {SWRConfig} from 'swr'
import fetcher from './utils/fetcher'
import {DbSessionContext} from './contexts/db-session'
import DbSession from './components/db-session'
import Layout from './layouts/index'
import PageChannels from './pages/channels'
import PageChannel from './pages/channel'
import PageRegister from './pages/register'
import PageLogin from './pages/login'
import PageLogout from './pages/logout'
import PageSettingsAccount from './pages/settings/account'
import PageSettingsChannels from './pages/settings/channels'
import PageNewChannel from './pages/channel/new'
import PageNewChannelImport from './pages/channel/import'
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
									<main>
										<Routes>
											<Route path="/" element={<PageHome />} />
											{/* User */}
											<Route path="register" element={<PageRegister />} />
											<Route path="login" element={<PageLogin />} />
											<Route path="logout" element={<PageLogout />} />
											<Route path="settings/account" element={<PageSettingsAccount dbSession={dbSession} />}></Route>
											<Route path="settings/channels" element={<PageSettingsChannels dbSession={dbSession} />}></Route>
											<Route path="new" element={<PageNewChannel dbSession={dbSession} />}></Route>
											<Route path="new/import" element={<PageNewChannelImport dbSession={dbSession} />} />
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
