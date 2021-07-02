import {ThemeContext} from '../contexts/theme'

export default function ThemeToggleButton() {
	return (
		<ThemeContext.Consumer>
			{(value) => (
				<button onClick={value.toggleTheme}>
					Toggle Theme
				</button>
			)}
		</ThemeContext.Consumer>
	)
}
