import {createContext} from 'react'

const darkMediaQuery = '(prefers-color-scheme: dark)'
const themes = ['dark', 'light']
const theme = window.matchMedia(darkMediaQuery).matches ? themes[0] : themes[1]

const themeContextDefault = {
	themes,
	theme,
	toggleTheme: () => {},
}

const ThemeContext = createContext(themeContextDefault)

export {
	ThemeContext,
	themeContextDefault,
	darkMediaQuery
}
