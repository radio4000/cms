import accessibleAutocomplete from 'accessible-autocomplete'
import fuzzysort from 'fuzzysort'

export default function CommandMenu() {
	return <command-menu shortcuts id="r4"></command-menu>
}

const radio4000Commands = [
	{keys: '', label: 'Create channel'},
	{keys: '', label: 'Go to channels'},
	{keys: '', label: 'Go to account'},
	{keys: '', label: 'Log out'},
	{keys: '', label: ''},
	{keys: '', label: ''},
	// {
	// 	keys: '',
	// 	label: 'Help',
	// 	command: () => {
	// 		console.log('send help plx')
	// 	},
	// },
	// {keys: 'p', label: 'Play/pause the session'},
	// {keys: 'n', label: 'Play next track in current radio'},
	// {keys: 's', label: 'Shuffle current track selection'},
	// {keys: 'm', label: '(un)mute the volume'},
	// {keys: 'r', label: 'Play a random radio channel'},
	// {keys: 'f', label: 'Cycle through formats (default, fullscreen, minimized)'},
	// {keys: 'g h', label: 'Go to home'},
	// {keys: 'g r', label: 'Go to all radios'},
	// {keys: 'g m', label: 'Go to map'},
	// {keys: 'g y', label: 'Go to history (y, as in your web-browser)'},
	// {keys: 'g i', label: 'Go to my radio (i, as in I, me)'},
	// {keys: 'g s', label: 'Go to my favorite radios (s, as in starred)'},
	// {keys: 'g t', label: 'Go to my tracks'},
	// {keys: 'g a', label: 'Go to add'},
	// {keys: 'g f', label: 'Go to feedback'},
	// {keys: 'g c', label: 'Go to current radio (the one being played)'},
	// {keys: 'g x', label: 'Go to the track being played (x, as in a cross to locate the track/trax)'},
]

class Autocomplete extends HTMLElement {
	connectedCallback() {
		this.enable()

		// If modal is activated, add keybindings to toggle it.
		if (this.hasAttribute('modal') || this.hasAttribute('shortcuts')) {
			document.addEventListener('keydown', this.handleShortcut.bind(this))
		}
	}
	// Ctrl+k or Command+k toggles it. Escape closes it, if open.
	handleShortcut(event) {
		// console.log(event)
		event.preventDefault()
		if ((event.ctrlKey || event.metaKey) && event.key === 'k') this.toggle()
		if (event.key === 'Escape' && this.hasAttribute('modal')) this.close()
	}
	handleClick(event) {
		if (event.target === this) {
			this.close()
		}
	}
	open() {
		this.classList.add('is-open')
		this.querySelector('.autocomplete__input').focus()
		document.addEventListener('click', this.handleClick.bind(this))
	}
	close() {
		this.classList.remove('is-open')
		document.removeEventListener('click', this.handleClick.bind(this))
	}
	toggle() {
		this.classList.contains('is-open') ? this.close() : this.open()
	}
	enable() {
		const list = radio4000Commands
		if (!list) return//throw new Error('Could not enable command menu. Missing a list of commands')

		accessibleAutocomplete({
			element: this,
			id: 'my-autocomplete', // not sure why this is needed
			placeholder: 'Type a command or search',
			autoselect: true,
			displayMenu: 'overlay',
			confirmOnBlur: false, // should be true for touch at least?
			showAllValues: true,
			// Used to search the command list.
			source(query, populateResults) {
				let results = fuzzysort.go(query, list, {key: 'label'})
				results = results.total ? results.map((r) => r.obj) : list
				populateResults(results)
			},
			templates: {
				inputValue: (val) => {
					if (val && val.label) return val.label
					return val
				},
				suggestion: (s) => {
					if (!s) return s
					return `${s.label} <kbd>${s.keys}</kbd>`
				},
			},
			onConfirm: (confirmed) => {
				this.close()
				console.log({confirmed})
				if (confirmed && confirmed.command) confirmed.command()
			},
			dropdownArrow: ({className}) =>
				`<svg class="${className}" style="top: 8px;" viewBox="0 0 512 512" ><path d="M256,298.3L256,298.3L256,298.3l174.2-167.2c4.3-4.2,11.4-4.1,15.8,0.2l30.6,29.9c4.4,4.3,4.5,11.3,0.2,15.5L264.1,380.9  c-2.2,2.2-5.2,3.2-8.1,3c-3,0.1-5.9-0.9-8.1-3L35.2,176.7c-4.3-4.2-4.2-11.2,0.2-15.5L66,131.3c4.4-4.3,11.5-4.4,15.8-0.2L256,298.3  z"/></svg>`,
		})
	}
}

customElements.get('command-menu') || customElements.define('command-menu', Autocomplete)

// <h1>&lt;command-menu&gt;</h1>
// <p>Command/Ctrl+k to open, ↑↓ to browse, ↵ to select, ESC to dismiss. Or... <button onclick="demoButton()">Tap here</button></p>
// <p style="margin-top: 2em; border: 2px dotted blue">You selected: <b id="my-autocomplete-confirmed"></b></p>
