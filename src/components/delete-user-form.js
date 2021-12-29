import {useState} from 'react'
import {deleteUser} from '../utils/crud/user'
import ErrorDisplay from './error-display'

export default function DeleteUserForm({onDelete}) {
	const [error, setError] = useState()

	async function confirmAndDelete(event) {
		event.preventDefault()
		if (!window.confirm('Do you really want to delete your account?')) return
		const {error} = await deleteUser()
		setError(error)
		if (!error) {
			setError(false)
			onDelete()
		}
	}

	return (
		<form onSubmit={confirmAndDelete}>
			<button type="submit" danger="true">
				Delete account
			</button>
			<ErrorDisplay error={error}></ErrorDisplay>
		</form>
	)
}
