import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

export default function useSession(sessionProvider) {
	const [session, setSession] = useState(null)
	const history = useHistory()

	useEffect(() => {
		setSession(sessionProvider.auth.session())

		sessionProvider.auth.onAuthStateChange((eventName, session) => {
			// Handle redirect when you've clicked email link to reset your password.
			if (eventName === 'PASSWORD_RECOVERY') {
				history.push('/account/reset-password')
			}
			setSession(session)
		})
	}, [sessionProvider.auth, history])

	return session
}
