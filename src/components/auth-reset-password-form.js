import {supabase} from '../utils/supabase-client'
import useForm from '../hooks/use-form'
import ErrorDisplay from './error-display'

export default function ResetPasswordForm() {
	const {form, bind, handleSubmit, error, loading, result} = useForm(
		{},
		{
			onSubmit: (changes) => {
				return supabase.auth.api.resetPasswordForEmail(changes.email)
			},
		}
	)

	if (result) return <p>OK, now check your email for a link to reset your password.</p>

	return (
		<details>
			<summary>Forgot your password?</summary>
			<form onSubmit={handleSubmit}>
				<br />
				<input
					id="email"
					name="email"
					type="email"
					placeholder="Your email"
					autoFocus={true}
					value={form.email}
					onChange={bind}
					required
				/>
				<button disabled={result || loading}>
					{loading ? <span>Loading</span> : <span>Reset password</span>}
				</button>
			</form>
			<ErrorDisplay error={error} />
		</details>
	)
}
