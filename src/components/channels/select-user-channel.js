import {NavLink} from 'react-router-dom'

/*
	 A component to select from the user's channels,
	 and handle a choice
 */
export default function SelectUserChannel({userChannel, userChannels, onChange}) {
	// const [isActive, setIsActive] = useState()
	if (!userChannel || userChannel === null) return null

	/*
		 needs <select value=""> empty,
		 to it always reset the select to the default option (current channel),
		 and all other option are clickable (because non of them is the "select's value")
*/
	return (
		userChannel && (userChannels?.length > 1) ? (
			<select
				className="SelectUserChannel"
				value=""
				name={userChannel.slug}
				onInput={onChange}
			>
				<option
					defaultValue={true}
					value=""
					disabled={true}
				>@{userChannel.slug}</option>
				{userChannels.map(channel => (
					<option
						key={channel.slug}
						value={channel.slug}
					>{channel.slug}</option>
				))}
			</select>
		) : (
			<NavLink to={`/${userChannel.slug}/`}>{userChannel.slug}</NavLink>
		)
	)
}
