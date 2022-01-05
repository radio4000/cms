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
				You are signed-in (<a onClick={() => firebase.auth().signOut()}>sign out</a>)
			</p>
		</div>
	)
}
export default LoginFirebase
