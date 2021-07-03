import useSWR from 'swr'
import {supabase} from '../utils/supabaseClient'

// Don't move this inside the component.
const QUERY = supabase.from('channels').select('*')

export default function Test() {
	const {data, error} = useSWR(['a unique identifier', QUERY])

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
