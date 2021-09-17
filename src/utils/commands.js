export default function createCommands({isSignedIn, history, userChannel}) {
	let commands = [
		{
			keys: 'g h',
			label: 'Go to home',
			action: () => {
				history.push('/')
			},
		},
		// {
		// 	keys: 'g c',
		// 	label: 'Go to channels',
		// 	action: () => {
		// 		history.push('/channels')
		// 	},
		// },
		{
			keys: 'g a',
			label: 'Go to account',
			action: () => {
				history.push('/account')
			},
		},
	]

	if (userChannel) {
		commands.push({
			label: `Go to ${userChannel.name}`,
			action: () => history.push(`/${userChannel.slug}`),
			keys: 'c c',
		})
	}

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
			keys: 'c c',
			label: 'Create channel',
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
