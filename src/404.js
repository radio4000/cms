import {useLocation} from 'react-router-dom'

export default function NoMatch() {
	let location = useLocation()

	return (
		<article>
			<h3>
				No match for <code>{location.pathname}</code>
			</h3>
		</article>
	)
}
