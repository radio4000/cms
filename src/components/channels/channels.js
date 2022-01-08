import React, {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'

export default function Channels({channels}) {
	return channels ? (
		<ul>
			{channels.map((channel) => (
				<li key={channel.id}>
					<Link to={`/${channel.slug}/`}>{channel.name}</Link>
				</li>
			))}
		</ul>
	) : <p>No channels</p>
}

/*
	 A component to select from the user's channels,
	 and handle a choice
 */
export const UserChannelsSelect = ({
	userChannel, userChannels, onChange
}) => {
	const [isActive, setIsActive] = useState()
	if (!userChannel || userChannel === null) return null

	/*
		 needs <select value=""> empty,
		 to it always reset the select to the default option (current channel),
		 and all other option are clickable (because non of them is the "select's value")
*/
	return (
		userChannel && (userChannels?.length > 1) ? (
			<select
				value=""
				name={userChannel.slug}
				onChange={onChange}
			>
				<option
					defaultValue={true}
					value=""
					disabled={true}
				>@{userChannel.name}</option>
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
