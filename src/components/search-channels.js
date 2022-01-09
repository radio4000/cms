import ErrorDisplay from 'components/error-display'
import useForm from 'hooks/use-form'
import {supabase} from 'utils/supabase-client'

function searchDatabase({query}) {
	return supabase
		.from('channels')
		.select('id, name')
		.textSearch('name', query, {type: 'plain', config: 'english'})
}

// What is nicer? This version where we destructure everything?
// or below where we use `f.*` to access everything?

// export default function SearchChannels() {
// 	const {form, bind, handleSubmit, loading, error, result} = useForm({query: ''}, {onSubmit: searchDatabase})
// 	console.log({loading, result, error})
// 	return (
// 		<div>
// 			<form onSubmit={handleSubmit}>
// 				<input id="query" type="search" required value={form.query} onChange={bind} />
// 				<button type="submit">Search</button>
// 			</form>
// 			<p>results:</p>
// 			{result && (
// 				<ul>
// 					{result.map(item => <li key={item.id}>{item.name}</li>)}
// 				</ul>
// 			)}
// 			<ErrorDisplay error={error} />
// 		</div>
// 	)
// }

// good question, where are whe? a props?
// how do we lift "f.result" up to test.js
export default function SearchChannels({handleSearch}) {
	const onSubmit = (form) => searchDatabase(form).then(handleSearch)
	const f = useForm({query: ''}, {onSubmit})

	return (
		<div>
			<form className="FormRow" onSubmit={f.handleSubmit}>
				<label>Search radio channels
					<input id="query" type="search" required value={f.form.query} onChange={f.bind} />
				</label>
				<button className="ButtonReset" type="submit">
					<svg width="16" viewBox="654 -372 1664 1664">
						<path d="M1806,332c0-123.3-43.8-228.8-131.5-316.5C1586.8-72.2,1481.3-116,1358-116s-228.8,43.8-316.5,131.5  C953.8,103.2,910,208.7,910,332s43.8,228.8,131.5,316.5C1129.2,736.2,1234.7,780,1358,780s228.8-43.8,316.5-131.5  C1762.2,560.8,1806,455.3,1806,332z M2318,1164c0,34.7-12.7,64.7-38,90s-55.3,38-90,38c-36,0-66-12.7-90-38l-343-342  c-119.3,82.7-252.3,124-399,124c-95.3,0-186.5-18.5-273.5-55.5s-162-87-225-150s-113-138-150-225S654,427.3,654,332  s18.5-186.5,55.5-273.5s87-162,150-225s138-113,225-150S1262.7-372,1358-372s186.5,18.5,273.5,55.5s162,87,225,150s113,138,150,225  S2062,236.7,2062,332c0,146.7-41.3,279.7-124,399l343,343C2305.7,1098.7,2318,1128.7,2318,1164z" />
					</svg>
				</button>
			</form>
			<p>results:</p>
			{f.result && (
				<ul>
					{f.result.map(item => <li key={item.id}>{item.name}</li>)}
				</ul>
			)}
			<ErrorDisplay error={f.error} />
		</div>
	)
}

// placeholder="Quick jump radios (⌨ /)"
