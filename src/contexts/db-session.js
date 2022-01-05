import {createContext} from 'react'

const dbSessionContextDefault = {
	session: null,
	database: null,
	userChannel: null,
	firebase: null,
	firebaseUiConfig: null,
	signOut: () => {},
	signIn: () => {},
	signUp: () => {},
}

const DbSessionContext = createContext(dbSessionContextDefault)

export {
	DbSessionContext,
	dbSessionContextDefault
}
