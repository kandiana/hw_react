import { ReactComponent as CrossIcon } from '../imgs/cross-icon.svg'

import './Input.css'

function Input(props) {
	const inputClasses = `Input ${props.inline ? 'Input_inline' : ''}`

	function clearInput(event) {
		const target = event.target.closest('svg')
		target.previousSibling.value = ''
		target.classList.add('hidden')
	}

	function toggleIcon(event) {
		if (!event.target.value) {
			event.target.nextSibling.classList.add('hidden')
		} else {
			event.target.nextSibling.classList.remove('hidden')
		}
	}

	return (
		<span className="Input__wrapper">
			<input
				id={props.id}
				type="text"
				placeholder={props.placeholder}
				name={props.name}
				defaultValue={props.value ? props.value : ''}
				data-value={props['data-value']}
				inputMode={props.inputMode}
				className={inputClasses}
				required={props.required}
				onInput={(event) => {
					if (event.target.nextSibling) {
						toggleIcon(event)
					}
					if (props.onInput) {
						props.onInput(event)
					}
				}}
			/>
			{props.inline ? null : (
				<CrossIcon className={`Input__icon ${props.value ? '' : 'hidden'}`} onClick={clearInput} />
			)}
			{/* onBlur={window.resize} */}
		</span>
	)
}

export default Input
