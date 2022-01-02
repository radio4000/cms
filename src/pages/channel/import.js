import React from 'react'
import LoginFirebase from '../../components/login-firebase'

export default function PageNewChannelImport({dbSession}) {
	const {
		firebase,
		firebaseUiConfig,
		firebaseUser,
		firebaseUserChannel,
		session,
		signOut,
		signIn
	} = dbSession

	const tokenSupabase = dbSession?.session?.access_token
	const tokenFirebase = firebaseUser?.multiFactor?.user?.accessToken

	const startMigration = async () => {
		try {
			const res = await fetch('http://127.0.0.1:8787', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ tokenFirebase, tokenSupabase }),
			})
			const data = await res.json()
			console.log(data)
		} catch (error) {
			console.error('Error calling migration backend', error)
		}
	}

	return (
		<>
			<header>
				<p>
					Follow these steps to migrate your old Radio4000 radio to the new system.
				</p>
			</header>
			<section>
				<h2>
					1. Log in your previous account
				</h2>
				<LoginFirebase
				firebase={firebase}
				firebaseUiConfig={firebaseUiConfig}
				firebaseUser={firebaseUser}
				/>
				{firebaseUser && firebaseUserChannel && (
					<p>Your channel is: @{firebaseUserChannel.slug}</p>
				)}
			</section>
			<section>
				<h2>
					2. Log in your new account
				</h2>
				{!session ? (
					<p>login supa</p>
				): (
					<p>logout supa</p>
				)}
			</section>
			<section>
				<h2>
					3. Start migrating to the new system
				</h2>
				<p>
					Migration will import your channel and all your tracks
				</p>
				<button
					onClick={startMigration}
					disabled={!tokenSupabase && !tokenFirebase}
				>
					Start migration
				</button>
			</section>
		</>
	)
}
