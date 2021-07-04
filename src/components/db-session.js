import useSession from '../hooks/use-session'
import {DbSessionContext} from '../contexts/db-session'
import {supabase} from '../utils/supabase-client'

export default function DbSession({children}) {
	const database = supabase
	const session = useSession(database)
	const dbSessionContext = {
		session,
		database,
		logout: () => database.auth.signOut()
	}

	return (
		<DbSessionContext.Provider value={dbSessionContext}>
			{children}
		</DbSessionContext.Provider>
	)
}
