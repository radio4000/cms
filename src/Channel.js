import {useState, useEffect} from 'react'
import {supabase} from './supabaseClient'

export default function Account({session}) {
	const [loading, setLoading] = useState(false)
	const [name, setName] = useState('')
	const [slug, setSlug] = useState('')

	async function saveChannel({name, slug}) {
		try {
			setLoading(true)
			const user = supabase.auth.user()

			const updates = {
				id: 1111,
				name: 'Test YO',
				slug: 'test-yo',
				user_id: user.id,
				updated_at: new Date(),
			}

			let {error} = await supabase.from('channels').insert(updates)

			if (error) {
				throw error
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				saveChannel({name, slug})
			}}
		>
			<label htmlFor="name">Name</label>
			<input id="name" value={name} onChange={(e) => setName(e.target.value)} />
			<br />

			<label htmlFor="slug">Slug</label>
			<input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
			<br />

			<button type="submit" disabled={loading}>
				{loading ? 'Loading ...' : 'Update'}
			</button>
		</form>
	)
}
