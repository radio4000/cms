import React, {useState} from 'react'
import LoginFirebase from '../../components/login-firebase'
import AuthForm from '../../components/auth-form'
import ErrorDisplay from '../../components/error-display'

export default function PageNewChannelImport({dbSession}) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [migrationResult, setMigrationResult] = useState(false)
	const {
		firebase,
		firebaseUiConfig,
		firebaseUser,
		firebaseUserChannel,
		session,
		signOut,
		signIn,
		userChannel,
		radio4000ApiUrl,
	} = dbSession

	const tokenSupabase = dbSession?.session?.access_token
	const tokenFirebase = firebaseUser?.multiFactor?.user?.accessToken

	const startMigration = async () => {
		setLoading(true)
		try {
			const res = await fetch(`${radio4000ApiUrl}/api/import/firebase-realtime`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					tokenTest: 'r4@anonymous',
					tokenFirebase,
					tokenSupabase,
				}),
			})
			const data = await res.json()
			console.log(data)
			setMigrationResult(data)
			setError(false)
		} catch (error) {
			console.error('Error calling migration backend', error)
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<header>
				<p>Follow these steps to migrate your existing Radio4000 channel to the new system.</p>
			</header>
			<section>
				<h2>1. Log in to your old account</h2>
				<LoginFirebase
					firebase={firebase}
					firebaseUiConfig={firebaseUiConfig}
					firebaseUser={firebaseUser}
				/>
				{firebaseUser && firebaseUserChannel && (
					<p>
						We will import the channel: <em>@{firebaseUserChannel.slug}</em>
					</p>
				)}
			</section>
			<section>
				<h2>2. Log in to your new account (on this site)</h2>
				{!session ? (
					<AuthForm onSubmit={signIn} submitLabel="Log in new account" />
				) : (
					<div>
						<p>
							You're signed-in as <em>{session.user.email}</em>{' '}
							<button onClick={signOut}>Sign out</button>
						</p>
						<p>{userChannel && `Will import into your channel @${userChannel.slug}`}</p>
					</div>
				)}
			</section>
			<section>
				<h2>3. Start migrating to the new system</h2>
				<p>Your channel and all your tracks will be imported.</p>
				<button onClick={startMigration} disabled={loading || !tokenSupabase || !tokenFirebase}>
					Start migration
				</button>
				{loading && <p>Running migration...</p>}
				{migrationResult && (
					<>
						<p>Migration result:</p>
					</>
				)}
				<ErrorDisplay error={error} />
			</section>
		</>
	)
}
