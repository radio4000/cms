import {useState} from 'react'

export function CreateForm({onSubmit, channel = {}}) {
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({})

	const handleSubmit = async (e) => {
		e.preventDefault()
		let res
		try {
			setLoading(true)
			res = await onSubmit(form)
			if (res && res.error) throw res.error
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
		return res
	}

	return (
		<form onSubmit={handleSubmit}>
			<h3>Create form</h3>
			<p>
				<label htmlFor="name">What would you like to call your radio channel?</label>
				<input
				id="name"
				type="text"
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

export function UpdateForm({channel, onSubmit}) {
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState(channel)

	const handleSubmit = async (e) => {
		e.preventDefault()
		let res
		try {
			setLoading(true)
			res = await onSubmit(form)
			if (res.error) throw res.error
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
		return res
	}

	return (
		<form onSubmit={handleSubmit}>
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
		</form>
	)
}

export function DeleteForm({channel, onSubmit}) {
	const [loading, setLoading] = useState(false)
	const [form, setForm] = useState({})

	function confirmDelete() {
		return window.confirm('Confirm you want to delete your channel')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		if (!confirmDelete()) {
			setLoading(false)
			return
		}

		let res
		try {
			res = await onSubmit(channel)
			if (res && res.error) throw res.error
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
		return res
	}

	return (
		<form onSubmit={handleSubmit}>
			<p>
				<span>Write the channel slug to delete the channel ({channel.slug}): </span>
				<input
				id="slug"
				type="text"
				placeholder={`${channel.slug}`}
				value={form.slug}
				required
				onChange={(e) => setForm({...form, [e.target.id]: e.target.value})}
				/>
				<button type="submit" disabled={loading || channel.slug !== form.slug }>
					{loading ? 'Loading...' : 'Delete'}
				</button>
			</p>
		</form>
	)
}
