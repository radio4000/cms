import {useState, useEffect, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import fuzzysort from 'fuzzysort'
import tinykeys from 'tinykeys'

export default function CommandMenu({isSignedIn}) {
	const history = useHistory()

	// Set up available commands.
	const commands = createCommands({isSignedIn, history})
	// Set up keyboard shortcuts.
	const commandShortcuts = createTinyShortcuts(commands)

	const ref = useRef()
	const inputRef = useRef()
	const listRef = useRef()

	const [isOpen, setIsOpen] = useState(false)
	const [input, setInput] = useState('')
	const [filteredCommands, setFilteredCommands] = useState(commands)
	const [selected, setSelected] = useState(0)

	const visibleCommands = input ? filteredCommands : commands

	useEffect(() => {
		let unsubscribe = tinykeys(window, commandShortcuts)
		return () => {
			unsubscribe()
		}
	})

	useEffect(() => {
		const uiShortcuts = {
			'$mod+KeyK': (event) => {
				event.preventDefault()
				setIsOpen(!isOpen)
				if (isOpen) {
					inputRef.current.blur()
				} else {
					inputRef.current.focus()
				}
			},
			Escape: (event) => {
				event.preventDefault()
				setInput('')
				setIsOpen(false)
				event.target.blur()
			},
			ArrowUp: (event) => {
				event.preventDefault()
				console.log('up', selected)
				setSelected(selected - 1 < 0 ? 0 : selected - 1)
			},
			ArrowDown: (event) => {
				event.preventDefault()
				console.log('down', selected)
				const cmds = input ? filteredCommands : commands
				setSelected(selected + 1 === cmds.length ? cmds.length - 1 : selected + 1)
			},
			Enter: (event) => {
				event.preventDefault()
				console.log('enter')
				const s = selected < 0 ? 0 : selected
				triggerCommand(visibleCommands[s])
			},
		}
		let unsubscribe = tinykeys(window, uiShortcuts)
		return () => {
			unsubscribe()
		}
	})

	// When input changes, search the list.
	function handleChange(event) {
		const value = event.target.value
		const results = fuzzysort.go(value, commands, {keys: ['label']})
		setInput(value)
		setFilteredCommands(results.map((r) => r.obj))
		// Select first or last if previous select was invalid.
		if (!results.length) {
			setSelected(0)
		} else if (selected > results.length - 1) {
			setSelected(results.length - 1)
		}
	}

	function handleTapOutside(event) {
		const shouldClose = isOpen && event.target === ref.current
		if (shouldClose) setIsOpen(false)
	}

	function triggerCommand(command) {
		if (!command) return
		console.log('Running command', command.label)
		setIsOpen(false)
		command.action && command.action()
	}

	return (
		<div ref={ref} className="CommandMenu" aria-expanded={isOpen} onClick={handleTapOutside}>
			<div hidden={!isOpen} className="CommandMenu-wrapper">
				{/* <label htmlFor="commandMenu-input">Type a command or search</label> */}
				<input
					id="commandMenu-input"
					type="search"
					placeholder="Type a command or search"
					ref={inputRef}
					value={input}
					onChange={handleChange}
					// onFocus={() => setIsOpen(true)}
					// onBlur={() => setIsOpen(false)}
				/>
				<ul ref={listRef}>
					{visibleCommands.map((command, index) => (
						<ListItem
							key={index}
							isSelected={index === selected}
							item={command}
							handleClick={() => triggerCommand(command)}
						/>
					))}
				</ul>
				<footer>
					<small>Command/Ctrl+K to open, ↑↓ to browse, ↵ to select, ESC to close</small>
				</footer>
			</div>
		</div>
	)
}

const ListItem = ({isSelected, item, handleClick}) => (
	<li>
		<button aria-selected={isSelected} onClick={handleClick}>
			{item.label}
			{item.keys && <kbd>{item.keys}</kbd>}
		</button>
	</li>
)

function createCommands({isSignedIn, history}) {
	let commands = [
		{
			keys: 'g h',
			label: 'Go to home',
			action: () => {
				history.push('/')
			},
		},
		{
			keys: 'g c',
			label: 'Go to channels',
			action: () => {
				history.push('/channels')
			},
		},
		{
			keys: 'g a',
			label: 'Go to account',
			action: () => {
				history.push('/account')
			},
		},
	]

	if (isSignedIn) {
		commands.push(
			{
				keys: 'c c',
				label: 'Create channel',
				action: () => {
					history.push('/account')
				},
			},
			{
				keys: '',
				label: 'Log out',
				action: () => {
					history.push('/logout')
				},
			}
		)
	} else {
		commands.push(
			{
				keys: '',
				label: 'Register',
				action: () => {
					history.push('/register')
				},
			},
			{
				keys: '',
				label: 'Log in',
				action: () => {
					history.push('/login')
				},
			}
		)
	}

	return commands
}

// From the commands, create an object of shortcuts for tinykeys.
function createTinyShortcuts(commands) {
	const shortcuts = {}
	commands.forEach((command) => {
		shortcuts[command.keys] = command.action
	})
	return shortcuts
}

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
