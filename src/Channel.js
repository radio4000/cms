import {useState, useEffect} from 'react'
import {supabase} from './supabaseClient'

export default function Account({session}) {
	const [loading, setLoading] = useState(false)
	const [deleting, setDeleting] = useState(false)
	const [name, setName] = useState('')
	const [slug, setSlug] = useState('')
	const [channel, setChannel] = useState('')

	useEffect(() => {
		findChannel()
	}, [session])

	async function findChannel() {
		try {
			setLoading(true)
			const user = supabase.auth.user()
			let {data, error, status} = await supabase
				.from('channels')
				.select(`*`)
				.eq('user_id', user.id)
				.single()
			if (error && status !== 406) throw error
			console.log('found channel', data)
			if (data) setChannel(data)
			if (!data) setChannel(null)
		} catch (error) {
			console.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	async function createChannel({name, slug}) {
		try {
			setLoading(true)
			const user = supabase.auth.user()
			let {data, error} = await supabase
				.from('channels')
				.insert({name, slug, user_id: user.id, updated_at: new Date()})
			if (error) throw error
			setChannel(data)
		} catch (error) {
			console.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	async function updateChannel({name, slug}) {
		try {
			setLoading(true)
			let {error} = await supabase
				.from('channels')
				.upsert({id: channel.id, name, slug, updated_at: new Date()})
			if (error) throw error
		} catch (error) {
			console.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	async function deleteChannel(id) {
		try {
			setDeleting(true)
			let {error} = await supabase.from('channels').delete().match({id})
			if (error) throw error
		} catch (error) {
			console.error(error.message)
		} finally {
			setDeleting(false)
			await findChannel()
		}
	}

	function confirmDelete() {
		console.log(channel.id)
		if (!channel?.id) return
		const didConfirm = window.confirm('Confirm you want to delete your channel')
		didConfirm && deleteChannel(channel.id)
	}

	console.log({channel})

	if (channel?.id)
		return (
			<div>
				<p>
					Your channels name is <strong>{channel.name}</strong>
				</p>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					updateChannel({name, slug})
				}}
			>
				<p>
					<label htmlFor="name">Name</label>
					<input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
					<br />

					<label htmlFor="slug">Slug</label>
					<input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
				</p>
				<p>
					<button type="submit" disabled={loading}>
						{loading ? 'Loading...' : 'Update'}
					</button>
				</p>
			</form>
				<p>
					<button type="button" onClick={confirmDelete}>
						{deleting ? 'Deleting...' : 'Delete'}
					</button>
				</p>
			</div>
		)

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					createChannel({name, slug})
				}}
			>
				<p>
					<label htmlFor="name">What would you like to call your radio channel?</label><br />
					<input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
					<br />

					<label htmlFor="slug">And the URL? (e.g. radio4000.com/{slug})</label><br/>
					<input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
				</p>
				<p>
					<button type="submit" disabled={loading}>
						{loading ? 'Loading...' : 'Make it so'}
					</button>
				</p>
			</form>
		</div>
	)
}
