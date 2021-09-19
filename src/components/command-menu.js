import {useState, useEffect, useRef} from 'react'
import fuzzysort from 'fuzzysort'
import tinykeys from 'tinykeys'

export default function CommandMenu({commands}) {
	// And an input to search them with fuzzysort.
	const [input, setInput] = useState('')
	// Here are the filtered commands.
	const [filteredCommands, setFilteredCommands] = useState(commands)
	const visibleCommands = input ? filteredCommands : commands
	// Which menu item is selected?
	const [selected, setSelected] = useState(0)
	// Is it open?
	const [isOpen, setIsOpen] = useState(false)
	// References to the elements.
	const ref = useRef()
	const inputRef = useRef()

	// Set up shortcuts.
	useEffect(() => {
		const commandKeys = createCommandShortcuts(commands)
		const uiShortcuts = {
			'$mod+KeyK': (event) => {
				if (event.tagName === 'INPUT') return
				event.preventDefault()
				if (isOpen) {
					setIsOpen(false)
					inputRef.current.blur()
				} else {
					setIsOpen(true)
					inputRef.current.focus()
				}
			},
			Escape: (event) => {
				if (event.tagName === 'INPUT') return
				if (!isOpen) return
				event.preventDefault()
				setIsOpen(false)
				setInput('')
				event.target.blur()
			},
			ArrowUp: (event) => {
				if (event.tagName === 'INPUT') return
				if (!isOpen) return
				event.preventDefault()
				const s = selected - 1 < 0 ? 0 : selected - 1
				setSelected(s)
			},
			ArrowDown: (event) => {
				if (event.tagName === 'INPUT') return
				if (!isOpen) return
				event.preventDefault()
				const cmds = visibleCommands
				const s = selected + 1 === cmds.length ? cmds.length - 1 : selected + 1
				setSelected(s)
			},
			Enter: (event) => {
				if (event.tagName === 'INPUT') return
				if (!isOpen) return
				event.preventDefault()
				const s = selected < 0 ? 0 : selected
				triggerCommand(visibleCommands[s])
			},
		}
		const shortcuts = {...commandKeys, ...uiShortcuts}
		let unsubscribe = tinykeys(window, shortcuts, {timeout: 500})
		return () => {
			unsubscribe()
		}
	})

	// When input changes, search the list and update selection, if needed.
	function handleChange(event) {
		const value = event.target.value
		const results = fuzzysort.go(value, commands, {keys: ['label']})
		setInput(value)
		setFilteredCommands(results.map((r) => r.obj))
		// Select first or last if selection would be out of bounds.
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
		setInput('')
		command.action && command.action()
	}

	return (
		<div ref={ref} className="CommandMenu" aria-expanded={isOpen} onClick={handleTapOutside}>
			<div hidden={!isOpen} className="CommandMenu-wrapper">
				<input
					id="commandMenu-input"
					type="search"
					placeholder="Type a command or search"
					ref={inputRef}
					value={input}
					onChange={handleChange}
				/>
				<div role="menu">
					{visibleCommands.map((command, index) => (
						<ListItem
							key={index}
							isSelected={index === selected}
							item={command}
							handleFocus={() => setSelected(index)}
							handleClick={() => triggerCommand(command)}
						/>
					))}
				</div>
				<footer>
					<small>Command/Ctrl+K to open, ↑↓ to browse, ↵ to select, ESC to close</small>
				</footer>
			</div>
		</div>
	)
}

const ListItem = ({isSelected, item, handleClick, handleFocus}) => (
	<button role="menuitem" aria-current={isSelected} onClick={handleClick} onFocus={handleFocus}>
		{item.label}
		{item.keys && <kbd>{item.keys}</kbd>}
	</button>
)

// From the commands prepare an object of shortcuts for tinykeys.
function createCommandShortcuts(commands) {
	const shortcuts = {}
	commands.forEach((command) => {
		shortcuts[command.keys] = (event) => {
			if (event.tagName === 'INPUT') return
			return command.action()
		}
	})
	return shortcuts
}
