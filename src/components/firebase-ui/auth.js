import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {firebase} from 'utils/firebase-client'

function FirebaseAuth() {
	const {auth} = firebase
	/* firebase-ui-(react) for login flow */
	const firebaseUiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			auth.EmailAuthProvider.PROVIDER_ID,
			auth.GoogleAuthProvider.PROVIDER_ID,
			auth.FacebookAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			// need to return false for same page redirect
			signInSuccessWithAuthResult: () => false,
		},
	}
	return (
		<StyledFirebaseAuth
		uiConfig={firebaseUiConfig}
		firebaseAuth={auth()} />
	)
}
export default FirebaseAuth
