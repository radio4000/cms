import 'radio4000-player'
import {usePlayer} from 'contexts/player'

export default function Player() {
	const {channel, track} = usePlayer()

	return (
		<div className="Player">
			<Statusline />
			<radio4000-player
				// channel-slug="oskar"
				channel-slug={channel?.slug}
				// autoplay="true"
				// volume="0"
				show-header="false"
				show-controls="false"
				show-tracklist="true"
			></radio4000-player>
		</div>
	)
}

function Statusline() {
	const {channel, track} = usePlayer()
	return (
		<div className="Statusline">
			{channel && channel.name} | {track && track.title}
		</div>
	)
}

// Non-working attempt to set a playlist
// import {useRef} from 'react'
// const playerEl = useRef()
// useEffect(() => {
// 	if (playerEl.current) {
// 		console.log(playerEl.current)
// 		var vue = playerEl.getVueInstance()
// 		vue.updatePlaylist(testPlaylist)
// 	}
// }, [playerEl])

// Create a playlist.
// const testPlaylist = {
// 	title: 'A title for this list',
// 	image:
// 		'https://78.media.tumblr.com/5080191d7d19fe64da558f2b4324563e/tumblr_p8eoiltn1t1twkjb3o1_1280.png',
// 	tracks: [
// 		{
// 			id: '1',
// 			title: 'Randomfunk.ogg',
// 			url: 'https://ia801409.us.archive.org/5/items/DWK051/Rare_and_Cheese_-_01_-_Randomfunk.ogg',
// 		},
// 		{
// 			id: '2',
// 			title: 'Rare and Cheese - Jazzpolice',
// 			url: 'https://ia801409.us.archive.org/5/items/DWK051/Rare_and_Cheese_-_02_-_Jazzpolice.ogg',
// 		},
// 	],
// }
