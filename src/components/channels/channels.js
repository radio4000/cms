import React from 'react'
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

export const UserChannelsSelect = ({
	userChannel, userChannels, onChange
}) => {
	if (!userChannel || userChannel === null) return null
	return (
		userChannel && (userChannels?.length > 1) ? (
			<select
				name={userChannel.slug}
				value={userChannel.slug}
				onChange={onChange}
				onSelect={onChange}
			>
				{userChannels.map(channel => (
					<option
						key={channel.slug}
						value={channel.slug}
					>@{channel.slug}</option>
				))}
			</select>
		) : (
			<NavLink to={`/${userChannel.slug}/`}>{userChannel.slug}</NavLink>
		)
	)
}
