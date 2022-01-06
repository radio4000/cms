import { useNavigate } from "react-router-dom";
import {DbSessionContext} from '../contexts/db-session'

export default function PageLogout({
	dbSession: {session, signOut}
}) {
	signOut()
	useNavigate()('/login/', { replace: true })
	return null
}
