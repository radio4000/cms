import {useState, useEffect} from 'react'

export default function useSession (sessionProvider) {
	const [session, setSession] = useState(null)

	useEffect(() => {
		setSession(sessionProvider.auth.session())
		sessionProvider.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	return session
}
