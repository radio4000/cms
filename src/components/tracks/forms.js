import useForm from '../../hooks/use-form'
import ErrorDisplay from '../error-display'
import {createTrack, updateTrack} from '../../utils/crud/track'

export function CreateTrackForm({database, userId, channelId, afterSubmit}) {
	const {form, loading, error, bind, handleSubmit} = useForm(
		{
			url: 'https://www.youtube.com/watch?v=E3pmkPZIMk0',
			title: 'Test - Track',
		},
		{
			onSubmit: (changes) => {
				createTrack({database, changes, channelId, userId}).then(afterSubmit)
			},
		}
	)

	return (
		<form onSubmit={handleSubmit}>
			<p>
				<label htmlFor="name">YouTube or Soundcloud URL</label>
				<input
					id="url"
					type="url"
					// autoFocus={true}
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
				<button type="submit" disabled={loading || !userId}>
					{loading ? 'Loading...' : 'Add track'}
				</button>
			</p>
			<ErrorDisplay error={error}></ErrorDisplay>
		</form>
	)
}

export function UpdateTrackForm({database, track, didUpdate}) {
	const {loading, error, bind, handleSubmit} = useForm(
		{},
		{
			onSubmit: (changes) => {
				updateTrack({database, id: track.id, changes}).then(didUpdate)
			},
		}
	)

	const {url, title, description} = track

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
			<br />
			<p>
				<button type="submit" disabled={loading}>
					{loading ? 'Saving...' : 'Save'}
				</button>
				<button onClick={didUpdate}>Cancel</button>
			</p>
			<ErrorDisplay error={error}></ErrorDisplay>
		</form>
	)
}
