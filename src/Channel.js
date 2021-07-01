import {useState, useEffect} from 'react'
import {supabase} from './supabaseClient'

// <Account> tries to fetch user's channel.
//	has channel? <EditForm channel>
//	else <CreateForm></CreateForm>

export default function Account({session}) {
	const [loading, setLoading] = useState(false)
	const [channel, setChannel] = useState(false)

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
			if (data) setChannel(data)
		} catch (error) {
			console.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	// Start fetching channel as soon as we have a session.
	useEffect(() => {
		findChannel()
	}, [session])

	console.log('render', channel)

	return (
		<div>
			If you have a radio, show the edit form.
			<br />
			If you don't, show the create form
			{!loading && channel?.id ? (
				<EditForm channel={channel} onDelete={setChannel}></EditForm>
			) : (
				<CreateForm onCreate={setChannel}></CreateForm>
			)}
		</div>
	)
}

function CreateForm({onCreate}) {
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({})

	function onSubmit(e) {
		e.preventDefault()
		createChannel({name: form.name, slug: form.slug})
	}

	async function createChannel({name, slug}) {
		try {
			setLoading(true)
			const user = supabase.auth.user()
			let {data, error} = await supabase
				.from('channels')
				.insert({name, slug, user_id: user.id, updated_at: new Date()})
				.single()
			if (error) throw error
			console.log(data)
			onCreate(data)
		} catch (error) {
			console.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<h3>Create form</h3>
			<p>
				<label htmlFor="name">What would you like to call your radio channel?</label>
				<br />
				<input
					id="name"
					name="name"
					// value={form.name}
					onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
					required
				/>
				<br />
				<label htmlFor="slug">And the URL? (e.g. radio4000.com/{form.slug})</label>
				<br />
				<input
					id="slug"
					name="slug"
					// value={form.slug}
					onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
					required
				/>
			</p>
			<p>
				<button type="submit" disabled={loading}>
					{loading ? 'Loading...' : 'Make it so'}
				</button>
			</p>
		</form>
	)
}

function EditForm({channel, onDelete}) {
	const [loading, setLoading] = useState(false)
	const [deleting, setDeleting] = useState(false)
	const [form, setForm] = useState(channel)

	function onSubmit(event) {
		event.preventDefault()
		updateChannel(form)
	}

	async function updateChannel({id, name, slug}) {
		try {
			setLoading(true)
			let {error} = await supabase.from('channels').upsert({id, name, slug, updated_at: new Date()})
			if (error) throw error
		} catch (error) {
			console.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	async function deleteChannel(id) {
		if (!channel.id) return
		try {
			setDeleting(true)
			let {error} = await supabase.from('channels').delete().match({id})
			if (error) throw error
			console.log('deleted channel')
			onDelete()
		} catch (error) {
			console.error(error.message)
		} finally {
			setDeleting(false)
		}
	}

	function confirmDelete() {
		const didConfirm = window.confirm('Confirm you want to delete your channel')
		didConfirm && deleteChannel(channel.id)
	}

	return (
		<form onSubmit={onSubmit}>
			<h3>Edit form</h3>
			<p>
				name: {channel.name}
				<br />
				slug: {channel.slug}
			</p>
			<p>
				<label htmlFor="name">Name</label>
				<input
					id="name"
					name="name"
					placeholder={channel.name}
					value={form.name}
					onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
					required
				/>
				<br />
				<label htmlFor="slug">Slug</label>
				<input
					id="slug"
					name="slug"
					placeholder={channel.slug}
					value={form.slug}
					onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
					required
				/>
			</p>
			<p>
				<button type="submit" disabled={loading}>
					{loading ? 'Loading...' : 'Update'}
				</button>
			</p>
			<p>
				<button type="button" onClick={confirmDelete}>
					{deleting ? 'Deleting...' : 'Delete'}
				</button>
			</p>
		</form>
	)
}
