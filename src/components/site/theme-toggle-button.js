import {ThemeContext} from 'contexts/theme'

export default function ThemeToggleButton(props) {
	return (
		<ThemeContext.Consumer>
			{(value) => (
				<button onClick={value.toggleTheme}>
					{props.label || 'Toggle Theme'}
				</button>
			)}
		</ThemeContext.Consumer>
	)
}
