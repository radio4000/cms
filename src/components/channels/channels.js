import React from 'react'
import {Link} from 'react-router-dom'

export default function Channels({channels}) {
	return channels ? (
		<ul>
			{channels.map((channel) => (
				<li key={channel.id}>
					<Link to={`/${channel.slug}`}>{channel.name}</Link>
				</li>
			))}
		</ul>
	) : <p>No channels</p>
}

export const UserChannelsSelect = ({
	userChannel, userChannels, onChange
}) => (
	<select
		name={userChannel.slug}
		value={userChannel.slug}
		defaultValue={userChannel.slug}
		onChange={onChange}
	>
		{userChannels && userChannels.map(channel => (
			<option
				key={channel.slug}
				value={channel.slug}
			>@{channel.slug}</option>
		))}
	</select>
)
