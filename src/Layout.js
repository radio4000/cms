import {ThemeContext} from './contexts/theme'

export default function Layout({children}) {
	return (
		<ThemeContext.Consumer>
			{({theme}) => (
				<div className={`Layout Layout--theme-${theme}`}>
					{children}
				</div>
			)}
		</ThemeContext.Consumer>
	)
}
