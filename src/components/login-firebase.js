import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function LoginFirebase({
	firebase,
	firebaseUiConfig,
	firebaseUser,
}) {

	if (!firebaseUser) {
		return (
			<div>
				<p>Sign-in your old Radio4000 account (Firebase):</p>
				<StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={firebase.auth()} />
			</div>
		);
	}
	return (
		<div>
			<p>
				You are signed-in your old Radio4000 account!
				<button onClick={() => firebase.auth().signOut()}>Sign-out</button>
			</p>
		</div>
	);
}
export default LoginFirebase
