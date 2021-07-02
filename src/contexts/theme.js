import {createContext} from 'react'

const BROWSER_DARK = '(prefers-color-scheme: dark)'
const themes = ['dark', 'light']

const checkBrowserThemeDark = () => window
		.matchMedia(BROWSER_DARK)
		.matches

const userBrowserTheme = checkBrowserThemeDark() ? themes[0] : themes[1]

// If user changes preference, toggle the class.
/* window.matchMedia(DARK).addEventListener('change', ({matches}) => {}) */

console.log('userBrowserTheme', userBrowserTheme)

const themeContextDefault = {
	theme: userBrowserTheme,
	themes,
	userBrowserTheme,
	toggleTheme: () => {},
}

const ThemeContext = createContext(themeContextDefault)

export {
	ThemeContext,
	themeContextDefault,
	checkBrowserThemeDark,
}
