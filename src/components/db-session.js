import {useEffect, useState} from 'react';
import useSession from '../hooks/use-session'
import useUserChannels from '../hooks/use-user-channels'
import {DbSessionContext} from '../contexts/db-session'
import {supabase} from '../utils/supabase-client'
import {
	firebase,
	firebaseUiConfig,
	firebaseGetUserChannel
} from '../utils/firebase-client'

export default function DbSession({children}) {
	const radio4000ApiUrl = process.env.REACT_APP_RADIO4000_API_URL || 'https://api.radio4000.com'
	const database = supabase
	const session = useSession(database)
	const {channels} = useUserChannels(database, session?.user.id)
	const userChannel = channels[0]

	// Local signed-in state.
	const [firebaseUser, setFirebaseUser] = useState(false);
	const [firebaseUserChannel, setFirebaseUserChannel] = useState(false);

	// Listen to the Firebase Auth state and set the local state.
	useEffect(() => {
		const unregisterAuthObserver = firebase.auth()
			.onAuthStateChanged(async(user) => {
				/* refresh id token, if expired, gets a new one */
				if (user) {
					try {
						await user.getIdToken(true)
					} catch (error) {
						console.error('Error refreshing Firebase user idToken', error)
						setFirebaseUser(false)
					}
				} else {
					setFirebaseUserChannel(false)
				}
				setFirebaseUser(user)
			})
		// Make sure we un-register Firebase observers when the component unmounts.
		return () => unregisterAuthObserver()
	}, [])

	useEffect(() => {
		async function somethingAsync() {
			try {
				const channel = await firebaseGetUserChannel(userFirebase.uid)
				setFirebaseUserChannel(channel)
			} catch (error) {
				console.error('Error getting firebase user', error);
			}
		}
		const userFirebase = firebaseUser?.multiFactor?.user
		if (userFirebase?.uid) somethingAsync()
	}, [firebaseUser])

	const dbSessionContext = {
		/* r4 context */
		radio4000ApiUrl,

		/* supabase context */
		session,
		database,
		userChannel,
		signOut: () => database.auth.signOut(),
		signIn: ({email, password}) => {
			if (password) {
				return database.auth.signIn({email, password})
			} else {
				return database.auth.signIn({email})
			}
		},
		signUp: async ({email, password}) => {
			if (!email) return
			if (password) {
				return database.auth.signUp({email, password})
			} else {
				// here we need to create a user with sign in, when no pw
				return database.auth.signIn({email})
			}
		},

		/* firebase context (old r4) */
		firebase,
		firebaseUiConfig,
		firebaseUser,
		firebaseUserChannel,
	}

	return (
		<DbSessionContext.Provider value={dbSessionContext}>{children}</DbSessionContext.Provider>
	)
}
