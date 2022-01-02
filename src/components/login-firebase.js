import React, {useEffect, useState} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function SignInScreen({
	firebaseUiConfig,
	firebase
}) {
	// Local signed-in state.
	const [isSignedIn, setIsSignedIn] = useState(false);
	// Listen to the Firebase Auth state and set the local state.
	useEffect(() => {
		const unregisterAuthObserver = firebase.auth()
			.onAuthStateChanged(user => {
				setIsSignedIn(!!user);
			});
		 // Make sure we un-register Firebase observers when the component unmounts.
		return () => unregisterAuthObserver();
	}, [])

	if (!isSignedIn) {
		return (
			<div>
				<h1>My App</h1>
				<p>Please sign-in:</p>
				<StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={firebase.auth()} />
			</div>
		);
	}
	return (
		<div>
			<h1>My App</h1>
			<p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
			<a onClick={() => firebase.auth().signOut()}>Sign-out</a>
		</div>
	);
}
export default SignInScreen
