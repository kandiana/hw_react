import { ReactComponent as CrossIcon } from '../imgs/cross-icon.svg'

import './Input.css'

function Input({
	id,
	name,
	value,
	dataValue,
	placeholder,
	inputMode,
	required,
	onInput,
	onChange,
	inline,
}) {
	const inputClasses = `Input ${inline ? 'Input_inline' : ''}`

	function clearInput(event) {
		const target = event.target.closest('svg')
		target.previousSibling.value = ''
		target.classList.add('hidden')

		const customEvent = {
			target: {
				name: target.previousSibling.name,
				value: '',
			},
		}
		onChange(customEvent)
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
				defaultValue={value ? value : ''}
				data-value={dataValue}
				inputMode={inputMode}
				className={inputClasses}
				required={required}
				onInput={(event) => {
					if (event.target.nextSibling) {
						toggleIcon(event)
					}
					if (onInput) {
						onInput(event)
					}
				}}
				onChange={onChange}
			/>
			{inline ? null : (
				<CrossIcon className={`Input__icon ${value ? '' : 'hidden'}`} onClick={clearInput} />
			)}
		</span>
	)
}

export default Input
