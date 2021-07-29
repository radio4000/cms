import {useState} from 'react'
import ErrorDisplay from './error-display'

function useForm(initialState, {onSubmit}) {
	const [form, setForm] = useState(initialState)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const bind = (e) => setForm({...form, [e.target.id]: e.target.value})

	async function handleSubmit(event) {
		event?.preventDefault()
		try {
			setLoading(true)
			console.log('submitting', form)
			const res = await onSubmit(form)
			console.log(res)
			if (res && res.error) {
				setError(res.error)
			} else {
				setError(false)
			}
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	return {form, loading, error, bind, handleSubmit}
}

export function CreateForm({onSubmit}) {
	const {form, loading, error, bind, handleSubmit} = useForm({}, {onSubmit})

	return (
		<form onSubmit={handleSubmit}>
			<h3>Create channel</h3>
			<p>
				<label htmlFor="name">What would you like to call your radio channel?</label>
				<input id="name" type="text" autoFocus={true} required onChange={bind} />
				<br />
				<label htmlFor="slug">And the slug? (e.g. radio4000.com/{form.slug})</label>
				<input id="slug" type="text" minLength="4" required onChange={bind} />
			</p>
			<p>
				<button type="submit" disabled={loading}>
					{loading ? 'Loading...' : 'Create channel'}
				</button>
			</p>
			<ErrorDisplay error={error}></ErrorDisplay>
		</form>
	)
}

export function UpdateForm({channel, onSubmit}) {
	const {form, loading, error, bind, handleSubmit} = useForm(channel, {onSubmit})

	return (
		<form onSubmit={handleSubmit}>
			<p>
				<label htmlFor="name">Name</label>
				<input id="name" type="text" value={form.name} required onChange={bind} />
				<br />
				<label htmlFor="slug">Slug</label>
				<input id="slug" type="text" value={form.slug} minLength="4" required onChange={bind} />
			</p>
			<p>
				<button type="submit" disabled={loading}>
					{loading ? 'Loading...' : 'Update'}
				</button>
			</p>
			<ErrorDisplay error={error}></ErrorDisplay>
		</form>
	)
}

export function DeleteForm({channel, onSubmit}) {
	const {form, loading, error, bind, handleSubmit} = useForm({}, {onSubmit})

	const confirmDelete = async (event) => {
		event.preventDefault()
		const didConfirm = window.confirm('Confirm you want to delete your channel')
		if (!didConfirm) return
		try {
			await handleSubmit()
			window.location.reload()
		} catch (err) {
			console.log('no delete?')
		}
	}

	return (
		<form onSubmit={confirmDelete}>
			<p>
				To delete your channel, confirm by writing <em>"{channel.slug}"</em>:
			</p>
			<p>
				<input
					id="slug"
					type="text"
					placeholder={`${channel.slug}`}
					value={form.slug}
					required
					onChange={bind}
				/>
				<button type="submit" disabled={loading || channel.slug !== form.slug} danger="true">
					{loading ? 'Loading...' : 'Delete channel'}
				</button>
			</p>
			<ErrorDisplay error={error}></ErrorDisplay>
		</form>
	)
}
