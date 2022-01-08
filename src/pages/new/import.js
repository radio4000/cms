import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import FirebaseAuth from 'components/firebase-ui/auth'
import ErrorDisplay from 'components/error-display'
import LayoutNewChannel from 'layouts/new-channel'
import LoginRequired from 'components/login-required'

export default function PageNewChannelImport({
	dbSession: {
		radio4000ApiUrl,
		firebase,
		session,
		userChannel,
		sessionFirebase,
		userChannelFirebase
	}
}) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [migrationResult, setMigrationResult] = useState(false)

	const tokenSupabase = session?.access_token
	const tokenFirebase = sessionFirebase?.multiFactor?.user?.accessToken

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
			// firebase.auth().signOut()
		}
	}

	let loginMessage
	if (userChannelFirebase) {
		loginMessage = `to finish importing ${userChannelFirebase.title} (@${userChannelFirebase.slug})`
	} else {
		loginMessage = `to import a radio channel from the previous system`
	}

	return (
		<LayoutNewChannel>
			<h1>Import channel</h1>
			{!sessionFirebase && !migrationResult && (
				<>
					<p>
						To import a channel from the previous Radio4000 version, login to your <i>(old)</i> channel's account.
					</p>
					<FirebaseAuth firebase={firebase}/>
				</>
			)}
			{sessionFirebase && !userChannelFirebase && (
				<p>
					This old Radio4000 account has no channel to migrate.<br/>
					You can <button onClick={() => firebase.auth().signOut()}>sign out</button> this account forever.
				</p>
			)}
			{userChannelFirebase && (
				<section>
					<p>
						Import the channel <strong>@{userChannelFirebase.slug}</strong> and its tracks into the new Radio4000 system?
					</p>
					<nav>
						<button onClick={startMigration} disabled={loading || !tokenSupabase || !tokenFirebase}>
							<strong>Import <em>@{userChannelFirebase.slug}</em></strong>
						</button>
						<button onClick={() => firebase.auth().signOut()}>Cancel and sign out of the old r4 system</button>
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

			{(!session) && (
				<footer>
				<small>You'll have to also{" "}</small>
					<LoginRequired
					register={true}
					importChannel={true}
					message={loginMessage}
					/>
				</footer>
			)}
		</LayoutNewChannel>
	)
}
