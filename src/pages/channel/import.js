import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import LoginFirebase from '../../components/login-firebase'
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
		userChannel,
		radio4000ApiUrl,
	} = dbSession

	const tokenSupabase = session?.access_token
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
			firebase.auth().signOut()
		}
	}

	return (
		<>
			{!firebaseUser && !migrationResult && (
				<>
					<p>Login your <strong>old radio4000</strong> application account to import a channel.</p>
					<LoginFirebase
					firebase={firebase}
					firebaseUiConfig={firebaseUiConfig}
					firebaseUser={firebaseUser}
					/>
				</>
			)}
			{firebaseUser && !firebaseUserChannel && (
				<p>
					This old Radio4000 acccount has no channel to migrate (you can <button onClick={() => firebase.auth().signOut()}>sign out</button>)!
				</p>
			)}
			{firebaseUserChannel && (
				<section>
					<p>
						Import the channel <strong>@{firebaseUserChannel.slug}</strong> and its tracks into the new Radio4000 system?
					</p>
					<nav>
						<button onClick={startMigration} disabled={loading || !tokenSupabase || !tokenFirebase}>
							<strong>Import <em>@{firebaseUserChannel.slug}</em></strong>
						</button>
						<button onClick={() => firebase.auth().signOut()}>Cancel and sign out of the old r4 system</button>
						<br/>
						{!tokenSupabase && <i>You need to login the new system first to do this.</i>}
					</nav>
				</section>
			)}
			{migrationResult && !error ? (
				<>
					<p>Migration success!</p>
					{userChannel && <Link to={`${userChannel.slug}`}>{userChannel.title}</Link>}
				</>
			) : (
				<ErrorDisplay error={error} />
			)}
		</>
	)
}
