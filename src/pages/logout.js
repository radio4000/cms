import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function PageLogout({
	dbSession: {session, signOut}
}) {
	const navigate = useNavigate()
	useEffect(() => {
		if (session) {
			signOut().finally(() => {
				navigate('/login', { replace: true })
			})
		}
		navigate('/login', { replace: true })
	}, [session])
	return null
}
