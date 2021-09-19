export default function createCommands({isSignedIn, history, userChannel}) {
	let commands = []

	commands.push({
		label: 'Go to home',
		keys: 'g h',
		action: () => {
			history.push('/')
		},
	})

	if (userChannel) {
		commands.push({
			label: `Go to ${userChannel.name}`,
			keys: 'c c',
			action: () => history.push(`/${userChannel.slug}`),
		})
	}

	commands.push({
		label: 'Go to account',
		keys: 'g a',
		action: () => {
			history.push('/account')
		},
	})

	commands.push(
		{
			label: 'Set interface theme to light',
			action: () => {
				// context too hard, yolo
				document.querySelector('.Layout').classList.add('Layout--theme-light')
				document.querySelector('.Layout').classList.remove('Layout--theme-dark')
			},
		},
		{
			label: 'Set interface theme to dark',
			action: () => {
				document.querySelector('.Layout').classList.remove('Layout--theme-light')
				document.querySelector('.Layout').classList.add('Layout--theme-dark')
			},
		}
	)

	if (isSignedIn && !userChannel) {
		commands.push({
			label: 'Create channel',
			keys: 'c c',
			action: () => {
				history.push('/account')
			},
		})
	}

	if (isSignedIn) {
		commands.push({
			label: 'Log out',
			action: () => {
				history.push('/logout')
			},
		})
	} else {
		commands.push(
			{
				label: 'Register',
				action: () => {
					history.push('/register')
				},
			},
			{
				label: 'Log in',
				action: () => {
					history.push('/login')
				},
			}
		)
	}

	return commands
}
