export default function ChannelAvatar(props) {
	const {name, image} = props.channel
	const baseUrl = 'https://res.cloudinary.com/radio4000/image/upload'
	const small = 'w_250,h_250'
	const large = 'w_500,h_500'
	const crop = 'c_thumb,q_60'
	// const imageUrl = `${baseUrl}/${image}`
	return (
		<figure>
			<picture>
				<source
					type="image/webp"
					srcSet={`${baseUrl}/${small},${crop},fl_awebp/${image}.webp 1x, ${baseUrl}/${large},${crop},fl_awebp/${image}.webp 2x`}
				/>
				<source
					media="(max-width: 500px)"
					srcSet={`${baseUrl}/${small},${crop}/${image}.jpg 1x, ${baseUrl}/${large},${crop}/${image}.jpg 2x`}
				/>
				<source
					srcSet={`${baseUrl}/${small},${crop},fl_lossy/${image} 1x, ${baseUrl}/${large},${crop},fl_lossy/${image} 2x`}
				/>
				<img src={`${baseUrl}/${small},${crop},fl_lossy/${image}`} alt={name} />
			</picture>
		</figure>
	)
}
