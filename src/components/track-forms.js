import {useState, useEffect} from 'react'
import clsx from 'clsx'
import tinykeys from 'tinykeys'
import useForm from '../hooks/use-form'
import ErrorDisplay from './error-display'
import {createTrack, updateTrack, deleteTrack} from '../utils/crud/track'
import date from './date'

export function Tracks({database, tracks, canEdit, afterDelete}) {
	if (!tracks?.length) return <p>No tracks</p>

	return (
		<section className="Tracks">
			{tracks.map((track) => (
				<Track
					key={track.id}
					track={track}
					database={database}
					canEdit={canEdit}
					afterDelete={afterDelete}
				></Track>
			))}
		</section>
	)
}

export function Track({track, database, canEdit, afterDelete}) {
	const {loading, handleSubmit: handleDelete} = useForm(track, {
		onSubmit: (track) => {
			deleteTrack({database, track}).then((res) => afterDelete(res.body[0]))
		},
	})
	const [editing, setEditing] = useState(false)
	const handleEdit = () => setEditing(!editing)

	// Close on escape
	useEffect(() => {
		let unsubscribe = tinykeys(window, {
			Escape: () => setEditing(false),
		})
		return () => {
			unsubscribe()
		}
	})

	return (
		<article
			className={clsx('Track', canEdit && 'can-edit', editing && 'is-editing')}
			title={'Created ' + date(track.created_at)}
		>
			{!canEdit ? (
				<>
					<div className="Track-main">
						<h4>{track.title}</h4>
						{track.description && <small>{track.description}</small>}
					</div>
					<TrackTags tags={track.tags} />
				</>
			) : (
				<>
					{editing ? (
						<UpdateTrackForm
							database={database}
							track={track}
							didUpdate={() => setEditing(false)}
						/>
					) : (
						<button className="Track-main ButtonReset" onClick={handleEdit}>
							<h4>{track.title}</h4>
							{track.description && <small>{track.description}</small>}
						</button>
					)}
					<menu>
						<button onClick={handleDelete} disabled={loading}>
							Delete
						</button>
						<TrackTags tags={track.tags} />
					</menu>
				</>
			)}
		</article>
	)
}

function TrackTags({tags}) {
	if (!tags.length) return null
	return (
		<span className="Track-tags">
			{tags.map((tag) => (
				<small key={tag} className="Tag">{tag}</small>
			))}
		</span>
	)
}

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
				<button type="submit" disabled={loading}>
					{loading ? 'Loading...' : 'Create track'}
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
