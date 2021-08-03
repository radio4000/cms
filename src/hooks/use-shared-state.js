import useSWR from 'swr'

// Tiny (?) hook for sharing state between components.
const useSharedState = (key, initialState) => {
	const {data: state, mutate: setState} = useSWR(key, {initialData: initialState})
	return [state, setState]
}

// Here's how to use it:

// function Comp1() {
// 	const [state, setState] = useSharedState('name', 'Apples')
// 	return <p>hello {state}</p>
// }

// function Comp2() {
// 	const [state, setState] = useSharedState('name', 'Oranges')
// 	setTimeout(() => setState('Bananas'), 1000)
// 	return <p>hello {state}</p>
// }


export default useSharedState

