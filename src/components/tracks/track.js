import {useState, useEffect} from 'react'
import clsx from 'clsx'
import tinykeys from 'tinykeys'

import date from 'components/date'
import useForm from 'hooks/use-form'
import {deleteTrack} from 'utils/crud/track'
import { UpdateTrackForm } from './forms'

function TrackTags({tags}) {
	if (!tags.length) return null
	return (
		<span className="Track-tags">
			{tags.map((tag) => (
				<small key={tag} className="Tag">
					{tag}
				</small>
			))}
		</span>
	)
}

export default function Track({track, database, canEdit, afterDelete}) {
	const {loading, handleSubmit: handleDelete} = useForm(track, {
		onSubmit: (track) => {
			deleteTrack({database, track}).then((res) => afterDelete(res.body[0]))
		},
	})
	const [editing, setEditing] = useState(false)
	const handleEdit = () => setEditing(!editing)

	console.log('track render')

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
					<TrackTags tags={track.tags} />
					<menu>
						<button danger="true" onClick={handleDelete} disabled={loading}>
							Del
						</button>
					</menu>
				</>
			)}
		</article>
	)
}
