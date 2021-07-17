import {createContext} from 'react'

const dbSessionContextDefault = {
	session: null,
	signOut: () => {},
	signIn: () => {},
	signUp: () => {},
}

const DbSessionContext = createContext(dbSessionContextDefault)

export {
	DbSessionContext,
	dbSessionContextDefault
}
