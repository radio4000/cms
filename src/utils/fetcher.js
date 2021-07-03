// import {supabase} from './supabaseClient'

// This is our global fetcher used for the SWR hook.
// If you want to override it, pass another "fetcher" as the second argument to useSWR()
// const fetcher = (...args) => fetch(...args).then((res) => res.json())

// We overwrite the default fetcher because supabase returns {data, error},
// which we need to handle.  SWR expects either some data or to throw an error.
const supabaseFetcher = async function supabaseFetcher(...args) {
	const {data, error} = await args[1]
	if (error) throw new Error(error)
	return data
}


export default supabaseFetcher
