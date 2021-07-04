import useSWR from 'swr'
import {CreateForm, EditForm} from '../components/channel-forms'
import {supabase} from '../utils/supabase-client'

// <Account> fetches the user's channel and shows either <CreateForm> or <EditForm>.

const QUERY = () => supabase.from('channels').select(`*`).eq('user_id', supabase.auth.user().id)

export default function Account({session}) {
	const {data: channels, error, mutate} = useSWR(['userchannel', QUERY])

	if (error) return <p>Error! {error.message}</p>
	if (!channels) return <p>Loading...</p>
	if (channels.length > 1)
		return <p>You have more than one radio. That's weird and should not happen.</p>
	if (!channels.length) return <CreateForm onCreate={(channel) => mutate({channel})}></CreateForm>

	return (
		<article>
			<h1>R4</h1>
			<EditForm
				channel={channels[0]}
				onEdit={(updates) => mutate([updates])}
				onDelete={() => mutate([])}
			></EditForm>
		</article>
	)
}
