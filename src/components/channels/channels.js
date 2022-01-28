import React from 'react'
import {Link} from 'react-router-dom'

export default function Channels({channels}) {
	return channels ? (
		<ul>
			{channels.map((channel) => (
				<li key={channel.id}>
					<Link to={`/${channel.slug}/`}>{channel.name}</Link>
				</li>
			))}
		</ul>
	) : <p>No channelsi ??</p>
}
