import {useState} from 'react'
import useForm from '../hooks/use-form'
import useTracks from '../hooks/use-tracks'
import ErrorDisplay from './error-display'
import {createTrack, updateTrack, deleteTrack} from '../utils/crud/track'
import date from './date'

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
	const {loading, handleSubmit: handleDelete} = useForm(track, {
		onSubmit: (track) => deleteTrack({database, track}),
	})
	const [editing, setEditing] = useState(false)
	const handleEdit = () => setEditing(!editing)

	return (
		<article className="Track">
			{editing ? (
				<UpdateTrackForm
					database={database}
					track={track}
					didUpdate={() => setEditing(false)}
				></UpdateTrackForm>
			) : (
				<p>
					{date(track.created_at)}
					<br />
					<a href={track.track_id.url}>{track.track_id.title}</a>
					<br />
					{track.track_id.description}
				</p>
			)}
			<menu>
				<button onClick={handleEdit}>{editing ? 'Stop editing' : 'Edit'}</button>
				<button onClick={handleDelete} disabled={loading}>
					Delete
				</button>
			</menu>
		</article>
	)
}

export function CreateTrackForm({database, userId, channelId}) {
	const {form, loading, error, bind, handleSubmit} = useForm(
		{
			url: 'https://www.youtube.com/watch?v=E3pmkPZIMk0',
			title: 'Test - Track',
		},
		{
			onSubmit: (track) => createTrack({database, track, channelId, userId}),
		}
	)

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

export function UpdateTrackForm({database, track, didUpdate}) {
	const {form, loading, error, bind, handleSubmit} = useForm(
		{},
		{
			onSubmit: (changes) => {
				updateTrack({database, id: track.id, changes}).then(didUpdate)
			},
		}
	)
	const {url, title, description} = track.track_id

	return (
		<form onSubmit={handleSubmit}>
			<p>
				<label htmlFor="name">YouTube or Soundcloud URL</label>
				<input id="url" type="url" autoFocus={true} defaultValue={url} required onChange={bind} />
				<br />
				<label htmlFor="title">Track Title</label>
				<input id="title" type="text" defaultValue={title} required onChange={bind} />
				<br />
				<label htmlFor="description">Description</label>
				<input id="description" type="text" defaultValue={description} onChange={bind} />
			</p>
			<p>
				<button type="submit" disabled={loading}>
					{loading ? 'Saving...' : 'Save changes'}
				</button>
			</p>
			<ErrorDisplay error={error}></ErrorDisplay>
		</form>
	)
}
