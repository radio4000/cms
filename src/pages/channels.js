import React, { useState, useEffect } from 'react';
import useChannels from '../hooks/use-channels'

const PageChannels = ({dbSession: {database}}) => {
	const channels = useChannels(database)

	if (!database) return null

	if (!channels) return <p>No channels</p>
	return channels.map(channel => {
		return <p key={channel.id}>channel_id: {channel.id}</p>
	})

}

export default PageChannels
