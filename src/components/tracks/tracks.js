import {useState} from 'react'
import Track from './track'

export default function Tracks({database, tracks, canEdit, afterDelete}) {
	if (!tracks?.length) return <p>No tracks</p>

	return (
		<section className="Tracks">
			<ListSelect
				items={tracks}
				component={(track) => (
					<Track database={database} track={track} canEdit={canEdit} afterDelete={afterDelete} />
				)}
			></ListSelect>
		</section>
	)
}

function ListSelect({items, component}) {
	const [selectedTracks, setSelectedTracks] = useState([])
	if (!items?.length) return <p>No items</p>

	function handleInputChange({target}) {
		const {name: trackId, checked} = target
		if (checked) {
			setSelectedTracks([...selectedTracks, trackId])
		} else {
			const arr = selectedTracks.filter((id) => id !== trackId)
			setSelectedTracks(arr)
		}
	}

	return (
		<section className="Tracks">
			<p>selected: {selectedTracks}</p>
			{items.map((item) => (
				<li key={item.id}>
					<input type="checkbox" name={item.id} onChange={handleInputChange} />
					{component(item)}
				</li>
			))}
		</section>
	)
}
