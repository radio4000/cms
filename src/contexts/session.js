import {createContext} from 'react'

const sessionContextDefault = {
	session: null,
	logout: () => {},
}

const SessionContext = createContext(sessionContextDefault)

export {
	SessionContext,
	sessionContextDefault
}
