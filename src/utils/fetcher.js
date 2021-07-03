// A "fetcher" is an async function that returns data for the useSWR() hook.
// See https://swr.vercel.app/docs/data-fetching

// This is our global fetcher. It's used by default and expects a supabase() query.
// which we need to handle.  SWR expects either some data or to throw an error.
const supabaseFetcher = async function supabaseFetcher(...args) {
	const {data, error} = await args[1]
	if (error) throw new Error(error)
	return data
}

// If we needed a simple "fetch" fetcher, we could use this.
// const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default supabaseFetcher
