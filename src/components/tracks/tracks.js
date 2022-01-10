import Track from './track'

export default function Tracks({database, tracks, canEdit, afterDelete}) {
	if (!tracks?.length) return <p>No tracks</p>

	return (
		<section className="Tracks">
			{tracks.map((track) => (
				<Track
					key={track.id}
					database={database}
					track={track}
					canEdit={canEdit}
					afterDelete={afterDelete}
				></Track>
			))}
		</section>
	)
}
