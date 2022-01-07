import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {SWRConfig} from 'swr'

import fetcher from 'utils/fetcher'
import {DbSessionContext} from 'contexts/db-session'
import DbSession from 'components/db-session'
import Layout from 'layouts/app'
import PageChannels from 'pages/channels'
import PageChannel from 'pages/channel'
import PageRegister from 'pages/register'
import PageLogin from 'pages/login'
import PageLogout from 'pages/logout'
import PageSettingsAccount from 'pages/account'
import PageSettingsChannels from 'pages/account/channels'
import PageNewChannel from 'pages/new'
import PageNewChannelImport from 'pages/new/import'
import PageHome from 'pages/home'
import PageNoMatch from 'pages/404'
import PageTest from 'pages/test'
import PageAdd from 'pages/add'
import PageResetPassword from 'pages/reset-password'
import PageChannelEdit from 'pages/channel/edit'

export default function App() {
	return (
		<SWRConfig value={{fetcher}}>
			<BrowserRouter>
				<DbSession>
					<DbSessionContext.Consumer>
						{(dbSession) => (
							<Layout session={dbSession.session}>
								<Routes>
									<Route path="/" element={<PageHome dbSession={dbSession} />} />
									{/* User Account */}
									<Route path="register" element={<PageRegister dbSession={dbSession} />} />
									<Route path="login" element={<PageLogin dbSession={dbSession} />} />
									<Route path="logout" element={<PageLogout dbSession={dbSession} />} />
									<Route path="account" element={<PageSettingsAccount dbSession={dbSession} />}></Route>
									<Route path="account/channels" element={<PageSettingsChannels dbSession={dbSession} />}></Route>
									<Route
									path="reset-password"
									element={<PageResetPassword dbSession={dbSession} />}
									/>
									{/* Channel(s) */}
									<Route path="new" element={<PageNewChannel dbSession={dbSession} />}></Route>
									<Route path="new/import" element={<PageNewChannelImport dbSession={dbSession} />} />
									<Route path="channels" element={<PageChannels dbSession={dbSession} />} />
									<Route path=":slug" element={<PageChannel dbSession={dbSession} />}></Route>
									<Route
									path=":slug/edit"
									element={<PageChannelEdit dbSession={dbSession} />}
									/>
									<Route path="add" element={<PageAdd dbSession={dbSession} />} />
									<Route path="add/:slug" element={<PageAdd dbSession={dbSession} />} />

									{/* Other pages */}
									<Route path="test" element={<PageTest dbSession={dbSession} />} />
									<Route path="*" element={<PageNoMatch />} />
								</Routes>
							</Layout>
						)}
					</DbSessionContext.Consumer>
				</DbSession>
			</BrowserRouter>
		</SWRConfig>
	)
}
