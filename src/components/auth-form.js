import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Auth({onSubmit, submitLabel, redirectTo}) {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(false)
	const [errorMessage, setErrorMessage] = useState(false)
	const [data, setData] = useState({email: '', password: ''})
	const {email, password} = data

	const handleChange = ({target}) => {
		const {name, value} = target
		setData({
			...data,
			[name]: value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		handleLogin(data)
	}

	const handleLogin = async (loginData) => {
		try {
			setLoading(true)
			const {error} = await onSubmit(loginData)
			if (error) {
				setErrorMessage(error)
				throw error
			} else {
				setErrorMessage(false)
			}
			if (!password) {
				setMessage('Check your email for the login link!')
			} else if (redirectTo) {
				navigate(redirectTo, {replace: true})
			}
		} catch(err) {
			setErrorMessage(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="FormStacked">
				<input
					name="email"
					type="email"
					placeholder="Your email"
					autoFocus={true}
					value={email}
					disabled={loading}
					onChange={handleChange}
					required
				/>
				<input
					name="password"
					type="password"
					placeholder="Your password"
					value={password}
					disabled={loading}
					onChange={handleChange}
				/>
				<button disabled={loading} type="submit">
					{loading ? <span>Loading</span> : <span>{submitLabel || 'Send magic link'}</span>}
				</button>
			</form>
			{errorMessage && <p danger="true">Error: {errorMessage.message}</p>}
			{message && <p>{message}</p>}
		</div>
	)
}
