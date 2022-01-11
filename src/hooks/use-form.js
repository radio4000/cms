import {useState} from 'react'

/*
This might look a bit crazy, but stay with me here.

Whenever you have a form in your UI you want to have access to the
form data, whether the request is loadin
, did it error or what is the result?

This hook provides exactly that.

Pass it two arguments:

- object of initial state, like {name: 'Jan'}
- as well as an async function called "onSubmit".

That's it. No it's not. There is also a "bind" tool that you attach to all your inputs like so:
<input type="text" id="name" value={name} onChange={bind} />

The id is required. That'll automatically update the value on the proxy "form" object.
*/

export default function useForm(initialState, {onSubmit}) {
	const [form, setForm] = useState(initialState)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [result, setResult] = useState(null)

	const bind = (e) => setForm({
		...form,
		[e.target.id]: e.target.value
	})

	async function handleSubmit(event) {
		event?.preventDefault()
		try {
			setLoading(true)
			const res = await onSubmit(form)
			// console.log('useForm:onSubmit response:', res)
			setError(res?.error ? res.error : false)
			setResult(res?.data ? res.data : null)
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	return {form, loading, error, bind, handleSubmit, result}
}
