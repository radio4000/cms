import {useState, useEffect} from 'react'
import {ThemeContext, themeContextDefault} from './contexts/theme.js'

export default function Layout({children}) {
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

	const darkModeListener = (event) => {
		if (event.matches) {
			setTheme(themeContextDefault.themes[0])
		} else {
			setTheme(themeContextDefault.themes[1])
		}
	}

	useEffect(() => {
		window.addEventListener('change', darkModeListener)
		return function cleanup() {
			window.removeEventListener('change', darkModeListener)
		}
	})

	return (
		<ThemeContext.Provider value={themeContext}>
			<div className={`Layout Layout--theme-${theme}`}>
				{children}
			</div>
		</ThemeContext.Provider>
	)
}
