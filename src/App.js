import {Router} from '@reach/router'
import {useState, useEffect} from 'react'
import {supabase} from './supabaseClient'
import Auth from './Auth'
import Account from './Account'

export default function Home() {
	const [session, setSession] = useState(null)

	useEffect(() => {
		setSession(supabase.auth.session())

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	// When you're not signed in, block and show auth.
	if (!session) return <Auth></Auth>

	return (
		<Router>
			<Account path="/" key={session.user.id} session={session} />
		</Router>
	)
}
