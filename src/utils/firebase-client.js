import config from 'config'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
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

/* default firebase app */
export function startFirebase() {
	firebase.initializeApp(firebaseConfig)
}

/* app methods */
const firebaseGetUser = async (userUid) => {
	const dbRef = ref(getDatabase())
	return get(child(dbRef, `users/${userUid}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val()
			}
			return null
		}).catch(error => {
			console.log('Error getting firebase user', error)
	})
}

const firebaseGetUserChannel = async (userUid) => {
	const dbRef = ref(getDatabase())
	const user = await firebaseGetUser(userUid)
	const channels = user.channels
	const channelId = Object.keys(channels)[0]
	return get(child(dbRef, `channels/${channelId}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val()
			} else {
				console.log('No firebase user.channel available')
			}
		}).catch(error => {
			console.log('Error getting firebase user channel', error)
		})
}

// select * from channels where slug = $1
const firebaseGetChannelBySlug = async (slug) => {
	const db = getDatabase()
	const filters = [orderByChild('slug'), equalTo(slug)]
	return get(query(ref(db, 'channels'), ...filters))
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val()
			} else {
				return null
			}
		})
		// .catch(error => {
		// 	console.log('Error getting firebase channel by slug', error)
		// })
}

export {firebase, firebaseGetUserChannel, firebaseGetChannelBySlug}
