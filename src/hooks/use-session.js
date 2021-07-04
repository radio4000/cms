import {useState, useEffect} from 'react'
import supabase from '../utils/supabase-client'

export default function useSession () {
	const [session, setSession] = useState(null)

	useEffect(() => {
		setSession(supabase.auth.session())

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	return session
}
