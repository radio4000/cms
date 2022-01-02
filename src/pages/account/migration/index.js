import React from 'react'
import LoginFirebase from '../../../components/login-firebase'

export default function PageAccountMigration({dbSession}) {
	const {firebaseUiConfig, firebase} = dbSession
	return (
		<LoginFirebase
		firebaseUiConfig={firebaseUiConfig}
		firebase={firebase}/>
	)
}
