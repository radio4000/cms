import {useState} from 'react'

export default function useForm(initialState, {onSubmit}) {
	const [form, setForm] = useState(initialState)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [result, setResult] = useState(null)

	const bind = (e) => setForm({...form, [e.target.id]: e.target.value})

	async function handleSubmit(event) {
		event?.preventDefault()
		try {
			setLoading(true)
			const res = await onSubmit(form)
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
