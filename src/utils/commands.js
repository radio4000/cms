export default function createCommands({isSignedIn, navigate, userChannel}) {
	let commands = []

	commands.push({
		label: 'Go to home',
		keys: 'g h',
		action: () => {
			navigate('/')
		},
	})

	if (userChannel) {
		commands.push({
			label: `Go to your channel: ${userChannel.name}`,
			keys: 'g c',
			action: () => navigate(`/${userChannel.slug}`),
		})
		commands.push({
			label: `Add track`,
			keys: 'c c',
			action: () => navigate('add'),
		})
		commands.push({
			label: `Edit your channel`,
			keys: 'g e',
			action: () => navigate(`/${userChannel.slug}/edit`),
		})
	} else {
		commands.push({
			label: `Create new channel`,
			action: () => navigate(`/new`),
		})
		commands.push({
			label: `Import channel`,
			action: () => navigate(`/new/import`),
		})
	}

	commands.push({
		label: 'Go to account',
		keys: 'g a',
		action: () => {
			navigate('/account')
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
				navigate('/account')
			},
		})
	}

	if (isSignedIn) {
		commands.push({
			label: 'Log out',
			action: () => {
				navigate('/logout')
			},
		})
	} else {
		commands.push(
			{
				label: 'Register',
				action: () => {
					navigate('/register')
				},
			},
			{
				label: 'Log in',
				action: () => {
					navigate('/login')
				},
			}
		)
	}

	return commands
}
