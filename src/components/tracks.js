import {useState} from 'react'
import {useTracks, createTrack} from '../utils/crud/track'
import ErrorDisplay from './error-display'

export default function Tracks({channelId, database}) {
	const {data: tracks, error} = useTracks(channelId, database)

	if (error) return <p>{error.details}</p>
	if (!tracks?.length) return <p>No tracks</p>

	return (
		<div>
			{tracks.map((channel) => (
				<article key={channel.id}>
					<header>
						<span>{channel.name}</span> <i>@{channel.slug}</i>
					</header>
				</article>
			))}
		</div>
	)
}

export function CreateTrackForm({database, userId, channelId}) {
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({url: 'https://www.youtube.com/', title: 'Whatever'})
	const [error, setError] = useState(false)

	// Shortcut?
	const bind = (e) => setForm({...form, [e.target.id]: e.target.value})

	const handleSubmit = async (event) => {
		event.preventDefault()
		console.log(form)
		try {
			setLoading(true)
			const res = await createTrack({database, data: form, channelId, userId})
			if (res && res.error) {
				setError(res.error)
			} else {
				setError(false)
			}
		} catch (error) {
			setError(error)
			throw error
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<h3>Add track</h3>
			<p>
				<label htmlFor="name">YouTube or Soundcloud URL</label>
				<input
					id="url"
					type="url"
					autoFocus={true}
					defaultValue={form.url}
					required
					onChange={bind}
				/>
				<br />
				<label htmlFor="title">Title</label>
				<input id="title" type="text" defaultValue={form.title} required onChange={bind} />
				<br />
				<label htmlFor="description">Description</label>
				<input id="description" type="text" onChange={bind} />
			</p>
			<p>
				<button type="submit" disabled={loading}>
					{loading ? 'Loading...' : 'Create track'}
				</button>
			</p>
			<ErrorDisplay error={error}></ErrorDisplay>
		</form>
	)
}
