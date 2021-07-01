// Needed for the CSS.
import icon from './theme-toggle-button.png'

const DARK = '(prefers-color-scheme: dark)'
const DARKCLASS = 'dark-theme'

export default function ThemeToggleButton() {
	// The <html> element.
	const el = document.documentElement

	// Set class if user prefers darkness.
	if (window.matchMedia(DARK).matches) {
		el.classList.add(DARKCLASS)
	}

	// If user changes preference, toggle the class.
	window.matchMedia(DARK).addEventListener('change', ({matches}) => {
		if (matches) {
			el.classList.add(DARKCLASS)
		} else {
			el.classList.remove(DARKCLASS)
		}
	})

	// And finally toggle when you tap the button.
	function setTheme() {
		el.classList.toggle(DARKCLASS)
	}

	return (
		<button className="ThemeToggleButton" onClick={setTheme}>
			Set theme
		</button>
	)
}
