import {useState} from 'react'
import supabase from '../utils/supabase-client'

export default function FormChannelCreate({onCreate}) {
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
