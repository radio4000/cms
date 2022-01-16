import {useState, useEffect} from 'react'

export default function useSessionFirebase(sessionProvider) {
	const [session, setSession] = useState(null)

    // Listen to the Firebase Auth state changes
	useEffect(() => {
		const unregisterAuthObserver = sessionProvider.auth()
			.onAuthStateChanged(async(user) => {
				/* refresh id token, if expired, gets a new one */
				if (user) {
					try {
						await user.getIdToken(true)
					} catch (error) {
						console.error('Error refreshing Firebase user idToken', error)
						setSession(false)
					}
				}
				setSession(user?.multiFactor?.user)
			})
		// Make sure we un-register Firebase observers when the component unmounts.
		return () => unregisterAuthObserver()
	}, [sessionProvider])

	return session
}

