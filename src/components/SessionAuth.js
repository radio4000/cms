import useSession from '../hooks/useSession'
import {SessionContext} from '../contexts/session'
import {supabase} from '../utils/supabaseClient'

export default function SessionAuth({children}) {
	const session = useSession()
	const sessionContext = {
		session,
		logout: () => supabase.auth.signOut()
	}

	return (
		<SessionContext.Provider value={sessionContext}>
			{children}
		</SessionContext.Provider>
	)
}
