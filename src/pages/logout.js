import { useNavigate } from "react-router-dom";
import {DbSessionContext} from '../contexts/db-session'

export default function PageLogout({
	dbSession: {session, signOut}
}) {
	const navigate = useNavigate()
	session && signOut()
	navigate('/login/', { replace: true })
	return null
}
