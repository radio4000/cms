import config from 'config'
import {supabase} from 'utils/supabase-client'
import {firebase} from 'utils/firebase-client'
import {DbSessionContext} from 'contexts/db-session'
import useSession from 'hooks/use-session'
import useSessionFirebase from 'hooks/use-session-firebase'
import useUserChannels from 'hooks/use-user-channels'
import useUserChannelFirebase from 'hooks/use-user-channel-firebase'

const {RADIO4000_API_URL} = config

export default function DbSession({children}) {
	const radio4000ApiUrl = RADIO4000_API_URL
	const database = supabase
	const session = useSession(database)
	const {userChannels} = useUserChannels(database, session?.user?.id)
	const userChannel = userChannels[0]

	const sessionFirebase = useSessionFirebase(firebase)
	const userFirebase = sessionFirebase?.multiFactor?.user
	const userChannelFirebase = useUserChannelFirebase(userFirebase?.uid)

	const dbSessionContext = {
		/* r4 context */
		radio4000ApiUrl,

		/* supabase context */
		database,
		session,
		userChannel,
		userChannels,
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
		sessionFirebase,
		userChannelFirebase,
	}

	return (
		<DbSessionContext.Provider value={dbSessionContext}>
			{children}
		</DbSessionContext.Provider>
	)
}
