// import {supabase} from './supabaseClient'

// const fetcher = (...args) => fetch(...args).then((res) => res.json())

const fetcher = async (...args) => {
	console.log(args)
	// const user = supabase.auth.user()
	let {data, error, status} = await args[1]
	if (error) throw Error(error)
	console.log({data, error, status})
	return data
}

export default fetcher
