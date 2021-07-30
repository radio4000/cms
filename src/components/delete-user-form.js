import {useState} from 'react'
import {supabase} from '../utils/supabase-client'
import ErrorDisplay from './error-display'

export default function DeleteUserForm({onDelete}) {
	const [error, setError] = useState()

	function confirm(event) {
		event.preventDefault()
		if (window.confirm('Do you really want to delete your account?')) deleteUser()
	}

	async function deleteUser(event) {
		const {error} = await supabase.rpc('delete_user')
		setError(error)
		if (!error) onDelete()
	}

	return (
		<form onSubmit={confirm}>
			<button type="submit" danger="true">Delete account</button>
			<ErrorDisplay error={error}></ErrorDisplay>
		</form>
	)
}
