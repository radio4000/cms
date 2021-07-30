export default function ErrorDisplay({error}) {
	if (!error) return null
	console.error(error)
	return (
		<p>
			<strong danger="true">Error!</strong>{' '}
			<em>
				{error.details}
				<br />
				{error.message}
			</em>
		</p>
	)
}
