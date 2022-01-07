import {useState, useEffect} from 'react'

export default function useCanEdit(userChannels, channelToCheck) {
	if (!channelToCheck || !channelToCheck.id) return false
	if (!userChannels || !userChannels.length) return false
	const userChannelsId = userChannels.map(channel => channel.id)
	return userChannelsId.indexOf(channelToCheck.id) > -1 ? true : false
}
