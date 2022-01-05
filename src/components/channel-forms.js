import useForm from '../hooks/use-form'
import ErrorDisplay from './error-display'

export function CreateForm({onSubmit}) {
	const {form, loading, error, bind, handleSubmit} = useForm({}, {onSubmit})

	return (
		<form onSubmit={handleSubmit}>
			<p>
				<label htmlFor="name">Name</label>
				<input id="name" type="text" autoFocus={true} required onChange={bind} />
				<br />
				<label htmlFor="slug">Slug: radio4000.com/{form.slug || `your-radio-channel-slug`}</label>
				<input id="slug" type="text" minLength="3" required onChange={bind} />
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
				<input id="slug" type="text" value={form.slug} minLength="3" required onChange={bind} />
				<br />
				<label htmlFor="description">Description</label>
				<input id="description" type="text" value={form.description} onChange={bind} />
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
			console.log('reload window?')
			// window.location.reload()
		} catch (err) {
			console.error('Could not delete channel')
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
