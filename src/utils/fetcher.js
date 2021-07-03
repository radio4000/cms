// import {supabase} from './supabaseClient'

// This is our global fetcher used for the SWR hook.
// If you want to override it, pass another "fetcher" as the second argument to useSWR()
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default fetcher
