import {useState} from 'react'
import {supabase} from '../utils/supabaseClient'

export function CreateForm({onCreate}) {
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
				.insert({name, slug, user_id: user.id, created_at: new Date(), updated_at: new Date()})
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
				<input
					id="name"
					type="text"
					https://app.supabase.io/project/kxodyvmivcdxrpmnlwgo/editor/sqltype="text"
					required
					onChange={(e) => setForm({...form, [e.target.id]: e.target.value})}
				/>
				<br />
				<label htmlFor="slug">And the slug? (e.g. radio4000.com/{form.slug})</label>
				<input
					id="slug"
					type="text"
					minLength="4"
					required
					onChange={(e) => setForm({...form, [e.target.id]: e.target.value})}
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

export function EditForm({channel, onDelete}) {
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
			let {data, error} = await supabase.from('channels').update({name, slug, updated_at: new Date()}).eq('id', id).single()
			if (error) throw error
			onDelete(data)
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
					type="text"
					placeholder={channel.name}
					value={form.name}
					required
					onChange={(e) => setForm({...form, [e.target.id]: e.target.value})}
				/>
				<br />
				<label htmlFor="slug">Slug</label>
				<input
					id="slug"
					type="text"
					placeholder={channel.slug}
					value={form.slug}
					minLength="4"
					required
					onChange={(e) => setForm({...form, [e.target.id]: e.target.value})}
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
