import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

function LoginFirebase({firebase, firebaseUiConfig, firebaseUser}) {
	const log = (data) => {
		console.log('ui callback', data)
	}
	return (
		<div>
			{!firebaseUser ? (
				<StyledFirebaseAuth
				uiCallback={log}
				uiConfig={firebaseUiConfig}
				firebaseAuth={firebase.auth()} />
			) : (
				<p>
					You are signed-in (<button onClick={() => firebase.auth().signOut()}>sign out</button>)
				</p>
			)}
		</div>
	)
}
export default LoginFirebase
