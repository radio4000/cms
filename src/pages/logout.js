import {useNavigate} from 'react-router-dom'

export default function PageLogout({
	dbSession: {session, signOut}
}) {
	signOut()
	useNavigate()('/login/', { replace: true })
	return null
}
