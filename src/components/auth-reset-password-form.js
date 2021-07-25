import {useState} from 'react'
import {supabase} from '../utils/supabase-client'

// THIS IS NOT FINISHED. Need to catch the redirect and show form to update password.
// https://supabase.io/docs/reference/javascript/reset-password-email#notes

export default function ResetPasswordForm({onSubmit, submitLabel}) {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(false)
	const [errorMessage, setErrorMessage] = useState(false)

	const handleSubmit = async (event) => {
		event.preventDefault()

		try {
			setLoading(true)
			const {error} = supabase.auth.api.resetPasswordForEmail(email)
			if (error) {
				setErrorMessage(error)
				throw error
			}
			setMessage('Check your email.')
			setErrorMessage(false)
		} catch (error) {
			console.log(error)
			setErrorMessage(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<p>Forgot your password?</p>
			<form onSubmit={handleSubmit}>
				<input
					name="email"
					type="email"
					placeholder="Your email"
					autoFocus={true}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button disabled={message || loading}>
					{loading ? <span>Loading</span> : <span>Reset password</span>}
				</button>
			</form>
			{errorMessage && <p danger="true">Error: {errorMessage.message}</p>}
			{message && <p>{message}</p>}
		</div>
	)
}
