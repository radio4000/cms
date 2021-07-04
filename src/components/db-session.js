import useSession from '../hooks/use-session'
import {DbSessionContext} from '../contexts/db-session'
import supabase from '../utils/supabase-client'

export default function DbSession({children}) {
	const session = useSession()
	const dbSessionContext = {
		session,
		database: supabase,
		logout: () => supabase.auth.signOut()
	}

	return (
		<DbSessionContext.Provider value={dbSessionContext}>
			{children}
		</DbSessionContext.Provider>
	)
}
