import useSWR from 'swr'
import {supabase} from '../utils/supabaseClient'

// @todo somehow pass this query in through useSWR to the fetcher.
const QUERY = supabase.from('channels').select('*')

// We overwrite the default fetcher because supabase returns {data, error},
// which we need to handle.
// SWR expects either some data or to throw an error.
async function supabaseFetcher() {
	const {data, error} = await QUERY
	if (error) throw new Error(error)
	return data
}

export default function Test() {
	const {data, error} = useSWR('a unique identifier for caching purposes', supabaseFetcher)

	if (error) return <div>Error</div>
	if (!data) return <div>Loading...</div>

	console.log(data)

	return (
		<ul>
			{data.map((item) => (
				<li key={item.id}>
					{item.id}, {item.name}
				</li>
			))}
		</ul>
	)
}
