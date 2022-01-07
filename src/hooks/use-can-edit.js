import {useState, useEffect} from 'react'

export default function useCanEdit(userChannel, channel) {
	if (!userChannel || !channel) return false
	if (userChannel.id === channel.id) return true
	return false
}
