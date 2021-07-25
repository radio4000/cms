import {useState} from 'react'
import {useTracks, createTrack, deleteTrack} from '../utils/crud/track'
import ErrorDisplay from './error-display'

export default function Tracks({channelId, database}) {
	const {data: tracks, error} = useTracks(channelId, database)

	if (error) return <p>{error.details}</p>
	if (!tracks?.length) return <p>No tracks</p>

	return (
		<section>
			{tracks.map((track) => (
				<Track key={track.id} track={track} database={database}></Track>
			))}
		</section>
	)
}

export function Track({track, database}) {
	const [loading, setLoading] = useState(false)
	async function handleDelete(event) {
		event.preventDefault()
		console.log('deleting track', track.id)
		setLoading(true)
		try {
			await deleteTrack({database, track})
			console.log('deleted')
		} catch (error) {
			console.error(error)
			alert(error)
		} finally {
			setLoading(false)
		}
	}
	return (
		<article>
			<p>
				{track.created_at}
				<br />
				{track.track_id.url}
				<br />
				{track.track_id.title}
			</p>
			{track.track_id.description && <p>{track.track_id.description}</p>}
			<menu>
				<button onClick={handleDelete} disabled={loading}>Delete</button>
			</menu>
		</article>
	)
}

export function CreateTrackForm({database, userId, channelId}) {
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({
		url: 'https://www.youtube.com/watch?v=E3pmkPZIMk0',
		title: 'Test - Track',
	})
	const [error, setError] = useState(false)

	// Shortcut?
	const bind = (e) => setForm({...form, [e.target.id]: e.target.value})

	const handleSubmit = async (event) => {
		event.preventDefault()
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
				<label htmlFor="title">Track Title</label>
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
