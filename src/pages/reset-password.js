import useForm from 'hooks/use-form'
import {
	ResetPasswordForm,
	ResetPasswordFormSession,
} from 'components/auth-reset-password-form'

export default function PageResetPassword({
	dbSession: {database, session}}
) {
	console.log('database/session', database, session)

	return !session ? (
		<ResetPasswordForm
		onResetPassword={session?.auth?.api?.updateUser}/>
	) : (
		<ResetPasswordFormSession
		onResetPassword={session?.auth?.api?.updateUser}
		session={session}/>
	)
}
