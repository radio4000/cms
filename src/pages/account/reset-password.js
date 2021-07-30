import ErrorDisplay from '../../components/error-display'
import useForm from '../../hooks/use-form'

export default function ResetPassword({dbSession}) {
	const {database, session} = dbSession
	const {form, error, bind, handleSubmit, result} = useForm(
		{},
		{
			onSubmit: () => database.auth.api.updateUser(session.access_token, {password: form.password}),
		}
	)

	if (!error && result) return <p>Your password has been updated.</p>

	return (
		<form onSubmit={handleSubmit}>
			<h2>Reset password for {session.user.email}</h2>
			<input
				id="password"
				placeholder="Enter a new password"
				type="text"
				minLength="6"
				required
				onChange={bind}
			></input>
			<button type="submit">Set new password</button>
			<ErrorDisplay error={error} />
		</form>
	)
}
