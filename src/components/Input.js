import { ReactComponent as CrossIcon } from '../imgs/cross-icon.svg'
import React, { useRef, useCallback, useEffect } from 'react'

import './Input.css'

function Input({
	id,
	name,
	value,
	placeholder,
	inputMode,
	required,
	focused,
	onInput,
	onChange,
	inline,
}) {
	const inputClasses = `Input ${inline ? 'Input_inline' : ''}`

	const inputRef = useRef()
	const toggleIconRef = useRef()

	useEffect(() => {
		if (focused) {
			inputRef.current.focus()
		}
	})

	const clearInput = useCallback(() => {
		inputRef.current.value = ''
		toggleIconRef.current.classList.add('hidden')

		const customEvent = {
			target: inputRef.current,
		}
		onChange(customEvent)
	}, [onChange])

	const toggleIcon = () => {
		if (!toggleIconRef.current) {
			return
		}

		if (!inputRef.current.value) {
			toggleIconRef.current.classList.add('hidden')
		} else {
			toggleIconRef.current.classList.remove('hidden')
		}
	}

	const handleInput = (event) => {
		toggleIcon(event)
		if (onInput) {
			onInput(event)
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
				<CrossIcon
					className={`Input__icon ${value ? '' : 'hidden'}`}
					onClick={clearInput}
					ref={toggleIconRef}
				/>
			)}
		</span>
	)
}

export default Input
