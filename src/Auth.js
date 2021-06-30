import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('')

	const handleLogin = async (email) => {
		try {
			setLoading(true)
			const { error } = await supabase.auth.signIn({ email })
			if (error) throw error
			alert('Check your email for the login link!')
		} catch (error) {
			alert(error.error_description || error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<div>
				<h1>R4</h1>
				<p>Sign in via magic link with your email below</p>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						handleLogin(email)
					}}
				>
					<input
						type="email"
						placeholder="Your email"
						autoFocus={true}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button disabled={loading}>
						{loading ? <span>Loading</span> : <span>Send magic link</span>}
					</button>
				</form>
			</div>
		</div>
	)
}
