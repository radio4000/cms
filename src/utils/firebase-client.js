import config from 'config'
/* firebase and firebase login ui */
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

/* firebase database */
import {getDatabase, ref, child, get, query, orderByChild, equalTo} from 'firebase/database'

const {
	FIREBASE_APP_ID,
	FIREBASE_PROJECT_ID,
	FIREBASE_DATABASE_URL,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_API_KEY,
} = config

/* config and app initialisation */
const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	databaseURL: FIREBASE_DATABASE_URL,
	projectId: FIREBASE_PROJECT_ID,
	appId: FIREBASE_APP_ID,
}

const firebaseUiConfig = {
	signInFlow: 'popup',
	signInOptions: [
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
	],
	callbacks: {
		// need to return false for same page redirect
		signInSuccessWithAuthResult: () => false,
	},
}

/* default firebase app */
firebase.initializeApp(firebaseConfig)

const dbRef = ref(getDatabase())

/* app methods */
const firebaseGetUser = async (firebaseUserUid) => {
	return get(child(dbRef, `users/${firebaseUserUid}`)).then((snapshot) => {
		if (snapshot.exists()) {
			return snapshot.val()
		} else {
			console.log('No firebase user available')
		}
	})
}

const firebaseGetUserChannel = async (firebaseUserUid) => {
	const user = await firebaseGetUser(firebaseUserUid)
	const channels = user.channels
	const channelId = Object.keys(channels)[0]
	return get(child(dbRef, `channels/${channelId}`)).then((snapshot) => {
		if (snapshot.exists()) {
			return snapshot.val()
		} else {
			console.log('No firebase user.channel available')
		}
	})
}

// select * from channels where slug = $1
const firebaseGetChannelBySlug = async (slug) => {
	const db = getDatabase()
	const filters = [orderByChild('slug'), equalTo(slug)]
	return get(query(ref(db, 'channels'), ...filters)).then((snapshot) => snapshot.val())
}

export {firebase, firebaseUiConfig, firebaseGetUserChannel, firebaseGetChannelBySlug}
