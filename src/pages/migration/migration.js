const { createClient } = supabase

// a vue application to migrate a user account,
// from old r4 (firebase) to new r4 (supabase)
// logs in a user with both platform
// and calls a vercel function to proceed to migration of user data (tracks etc.)
const vueApp = new Vue({
	el: '#app',
	data: {
		// login flow for supabase (firebase is handled by firebaseUI)
		email: '',
		password: '',

		// the session/user token for firebase (old r4) and supabase (new r4),
		// that we pass the backend function that will handle migration
		tokenFirebase: null,
		tokenSupabase: null,

		// supabase instance we're connecting to
		supabase: {
			url: 'https://jbmaibztbxmtrtjzrory.supabase.co',
			key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDk1OTgxMSwiZXhwIjoxOTU2NTM1ODExfQ.s2Cr-3AoFxkzQwrPXEx8vcj7eJluK__VK8XKiXsCxT4',
		},

		// config for the firebase app on radio4000 live
		firebaseConfig: {
			apiKey: 'AIzaSyDu8ksQyO7t1hEAPjejIoA_xbMN7iiMakE',
			authDomain: 'radio4000.firebaseapp.com',
			databaseURL: 'https://radio4000.firebaseio.com',
			projectId: 'firebase-radio4000',
			storageBucket: 'firebase-radio4000.appspot.com',
			messagingSenderId: '561286102640',
			appId: '1:561286102640:web:78ee946fa6f1c5b39afeb5',
		},
	},

	// lifecycle hook; when the vue app is mounted
	mounted() {
		const self = this

		this.$nextTick(() => {
			// Initialize Firebase
			const firebaseApp = firebase.initializeApp(this.firebaseConfig)

			// Initialize the FirebaseUI Widget using Firebase.
			const ui = new firebaseui.auth.AuthUI(firebase.auth())
			const uiConfig = {
				callbacks: {
					signInSuccessWithAuthResult(authResult, redirectUrl) {
						// console.log('signed in to firebase', authResult)
						// self.tokenFirebase = authResult.credential.idToken
						return false
					},
					uiShown() {
						// The widget is rendered.
						// Hide the loader.
						document.getElementById('loader').style.display = 'none'
					},
				},
				// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
				signInFlow: 'popup',
				// signInSuccessUrl: '<url-to-redirect-to-on-success>',
				signInOptions: [
					firebase.auth.EmailAuthProvider.PROVIDER_ID,
					firebase.auth.GoogleAuthProvider.PROVIDER_ID,
					firebase.auth.FacebookAuthProvider.PROVIDER_ID,
				],
			}
			ui.start('#firebaseui-auth-container', uiConfig)

			firebase.auth().onAuthStateChanged(this.handleFirebaseAuthChanged)

			// supabase client init
			this.supabaseClient = createClient(this.supabase.url, this.supabase.key)
			this.supabaseClient.auth.onAuthStateChange((event, session) => {
				console.log('supabase auth changed', { event, session })
				if (session && session.access_token) {
					this.tokenSupabase = session.access_token
				} else {
					this.tokenSupabase = null
				}
			})
		})
	},

	computed: {
		canMigrate() {
			return this.tokenFirebase && this.tokenSupabase
		},
	},

	// applicaiton methods
	methods: {
		handleFirebaseAuthChanged: async function(data) {
			console.log('firebase auth changed', data)
			if (!data) {
				// @todo enable
				this.tokenFirebase = null
				return
			}
			// const user = data.multiFactor.user
			// const {accessToken, uid} = user
			firebase
				.auth()
				.currentUser.getIdToken(true)
				.then((idToken) => {
					console.log({ idToken })
					if (idToken) this.tokenFirebase = idToken
				})
				.catch((error) => {
					console.log('could not get firebase id token', error)
				})
		},
		loginSupabase: async function () {
			const { user, error } = await this.supabaseClient.auth.signIn({
				email: this.email,
				password: this.password,
			})
		},
		logoutFirebase() {
			firebase.auth().signOut()
			this.tokenFirebase = null
		},
		async logoutSupabase() {
			const { error } = await this.supabaseClient.auth.signOut()
		},
		// Sends a request to our backend function to process the migration.
		async startMigration() {
			const { tokenFirebase, tokenSupabase } = this
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
		},
	},
})
