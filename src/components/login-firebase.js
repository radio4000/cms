import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

function LoginFirebase({firebase, firebaseUiConfig, firebaseUser}) {
	if (!firebaseUser) {
		return (
			<div>
				<StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={firebase.auth()} />
			</div>
		)
	}
	return (
		<div>
			<p>
				You are signed-in <button onClick={() => firebase.auth().signOut()}>Sign out</button>
			</p>
		</div>
	)
}
export default LoginFirebase
