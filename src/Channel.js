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
			if (!data.id) setChannel({})
		} catch (error) {
			alert(error.message)
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
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	// async function updateChannel({name, slug}) {
	// 	try {
	// 		setLoading(true)
	// 		let {error} = await supabase
	// 			.from('channels')
	// 			.upsert({id: channel.id, name, slug, updated_at: new Date()})
	// 		if (error) throw error
	// 	} catch (error) {
	// 		alert(error.message)
	// 	} finally {
	// 		setLoading(false)
	// 	}
	// }

	async function deleteChannel(id) {
		try {
			setDeleting(true)
			console.log('deleting', id)
			let {error} = await supabase.from('channels').delete().match({id})
			if (error) throw error
			await findChannel()
		} catch (error) {
			alert(error.message)
		} finally {
			setDeleting(false)
		}
	}

	function confirmDelete() {
		console.log(channel.id)
		if (!channel?.id) return
		const didConfirm = window.confirm('Confirm you want to delete your channel')
		didConfirm && deleteChannel(channel.id)
	}

	console.log({channel})

	return (
		<div>
			<h1>Channel CRUD playground</h1>

			<p>
				{channel.id ? (
					<>
						Your channels name is <strong>{channel.name}</strong>
					</>
				) : (
					`Create your channel here:`
				)}
			</p>

			<form
				onSubmit={(e) => {
					e.preventDefault()
					createChannel({name, slug})
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
						{loading ? 'Loading...' : 'Save'}
					</button>
					{channel.id ? (
						<button type="button" onClick={confirmDelete}>
							{deleting ? 'Deleting...' : 'Delete'}
						</button>
					) : null}
				</p>
			</form>
		</div>
	)
}
