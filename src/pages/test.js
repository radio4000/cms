import useSWR from 'swr'
import {supabase} from 'utils/supabase-client'
import SearchChannels from 'components/search-channels'

// This CAN NOT be inside the React component.
const QUERY = () => supabase.from('channels').select('*')

export default function Test() {
	const {data, error} = useSWR(['a unique identifier', QUERY])

	if (error) return <p>Error</p>
	if (!data) return <p>Loading...</p>

	return (
		<>
		<p>just testing</p>
		<SearchChannels />
		<ul>
			{data.map((item) => (
				<li key={item.id}>
					{item.name}
				</li>
			))}
		</ul>
		</>
	)
}
