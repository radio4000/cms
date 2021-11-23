import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function useSession(sessionProvider) {
	const [session, setSession] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		setSession(sessionProvider.auth.session())

		sessionProvider.auth.onAuthStateChange((eventName, session) => {
			// Handle redirect when you've clicked email link to reset your password.
			if (eventName === 'PASSWORD_RECOVERY') {
				navigate('/account/reset-password')
			}
			setSession(session)
		})
	}, [sessionProvider.auth, navigate])

	return session
}
