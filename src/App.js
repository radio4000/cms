import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {ThemeContext, themeContextDefault} from './contexts/theme.js'

import {supabase} from './supabaseClient'
import Layout from './Layout'
import Auth from './Auth'
import Account from './Account'
import Channel from './Channel'
import NoMatch from './404'
import ThemeToggleButton from './components/theme-toggle-button'

export default function Home() {
	const [session, setSession] = useState(null)

	useEffect(() => {
		setSession(supabase.auth.session())

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	const toggleTheme = () => {
		const {themes, theme} = themeContext
		const themesLength = themes.length
		const activeThemeIndex = themes.indexOf(theme)
		const newThemeIndex = themesLength % activeThemeIndex
		const newTheme = themes[newThemeIndex]
		setTheme(newTheme)
	}

	const [theme, setTheme] = useState(themeContextDefault.theme)

	const themeContext = {
		theme,
		themes: themeContextDefault.themes,
		userBrowserTheme: themeContextDefault.userBrowserTheme,
		toggleTheme: toggleTheme
	}

	return (
		<ThemeContext.Provider value={themeContext}>
			<Router>
				<Layout>
					<header>
						<nav>
							<Link to="/">Home</Link>
							<ThemeToggleButton></ThemeToggleButton>
						</nav>
						{!session ? <Auth></Auth> : null}
					</header>
					{ session ? (
							<Switch>
								<Route exact path="/">
									<Account key={session.user.id} session={session}></Account>
								</Route>
								<Route path="/channel">
									<Channel key={session.user.id} session={session}></Channel>
								</Route>
								<Route path="*">
									<NoMatch />
								</Route>
							</Switch>
					) : null}
				</Layout>
			</Router>
		</ThemeContext.Provider>
	)
}
