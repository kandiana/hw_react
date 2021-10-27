import { ReactComponent as CrossIcon } from '../imgs/cross-icon.svg'
import { useRef } from 'react'

import './Input.css'

function Input({ id, name, value, placeholder, inputMode, required, onInput, onChange, inline }) {
	const inputClasses = `Input ${inline ? 'Input_inline' : ''}`

	const inputRef = useRef()

	function clearInput(event) {
		const target = event.target.closest('svg')
		inputRef.current.value = ''
		target.classList.add('hidden')

		const customEvent = {
			target: inputRef.current,
		}
		onChange(customEvent)
	}

	function handleInput(event) {
		toggleIcon(event)
		if (onInput) {
			onInput(event)
		}
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
				id={id}
				type="text"
				placeholder={placeholder}
				name={name}
				value={value ? value : ''}
				inputMode={inputMode}
				className={inputClasses}
				required={required}
				onInput={handleInput}
				onChange={onChange}
				ref={inputRef}
			/>
			{inline ? null : (
				<CrossIcon className={`Input__icon ${value ? '' : 'hidden'}`} onClick={clearInput} />
			)}
		</span>
	)
}

export default Input
