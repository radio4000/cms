import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {SWRConfig} from 'swr'

import fetcher from 'utils/fetcher'
import {DbSessionContext} from 'contexts/db-session'
import DbSession from 'components/db-session'
import Layout from 'layouts/app'
import PageChannels from 'pages/channels'
import PageChannel from 'pages/channel'
import PageRegister from 'pages/auth/register'
import PageLogin from 'pages/auth/login'
import PageLogout from 'pages/auth/logout'
import PageSettingsAccount from 'pages/account'
import PageSettingsChannels from 'pages/account/channels'
import PageNewChannel from 'pages/new'
import PageNewChannelImport from 'pages/new/import'
import PageHome from 'pages/home'
import PageNoMatch from 'pages/404'
import PageTest from 'pages/test'
import PageAdd from 'pages/add'
import PageResetPassword from 'pages/auth/reset-password'
import PageChannelEdit from 'pages/channel/edit'

import AuthRequired from 'components/auth-required'

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

									<Route path="account" element={
										<AuthRequired session={dbSession.session}>
											<PageSettingsAccount dbSession={dbSession} />
										</AuthRequired>
									}></Route>
									<Route path="account/channels" element={
										<AuthRequired session={dbSession.session}>
											<PageSettingsChannels dbSession={dbSession}/>
										</AuthRequired>
									}></Route>

									<Route path="reset-password" element={<PageResetPassword dbSession={dbSession} />} />

									{/* Channel(s) */}
									<Route path="new" element={<PageNewChannel dbSession={dbSession} />} />
									<Route path="new/import" element={<PageNewChannelImport dbSession={dbSession} />} />
									<Route path="channels" element={<PageChannels dbSession={dbSession} />} />
									<Route path=":slug" element={<PageChannel dbSession={dbSession} />} />
									<Route path=":slug/edit" element={<PageChannelEdit dbSession={dbSession} />} />
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
