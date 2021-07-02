import {createContext} from 'react'

const BROWSER_DARK = '(prefers-color-scheme: dark)'

const themes = ['dark', 'light']
const userBrowserTheme = window.matchMedia(BROWSER_DARK).matches ? 'dark' : 'light'

// If user changes preference, toggle the class.
/* window.matchMedia(DARK).addEventListener('change', ({matches}) => {}) */

const themeContextDefault = {
	theme: userBrowserTheme,
	themes,
	userBrowserTheme,
	toggleTheme: () => {},
}

const ThemeContext = createContext(themeContextDefault)

export {
	ThemeContext,
	themeContextDefault
}
