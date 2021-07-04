import {createContext} from 'react'

const dbSessionContextDefault = {
	session: null,
	logout: () => {},
}

const DbSessionContext = createContext(dbSessionContextDefault)

export {
	DbSessionContext,
	dbSessionContextDefault
}
