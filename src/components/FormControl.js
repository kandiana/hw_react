import Input from './Input'

import './FormControl.css'

function FormControl({
	label,
	name,
	value,
	dataValue,
	placeholder,
	inputMode,
	onInput,
	oneline,
	required,
	dimension,
	onChange,
}) {
	const blockClasses = `Form-control ${oneline ? 'Form-control_oneline' : ''}`

	return (
		<div className={blockClasses}>
			<label>
				<span className="Form-control__label">
					{label}
					{required ? <span className="Form-control_requred"> *</span> : null}
				</span>
				<Input
					inline={oneline}
					placeholder={placeholder}
					name={name}
					value={value}
					required={required}
					onInput={onInput}
					onChange={onChange}
					dataValue={dataValue}
					inputMode={inputMode}
				/>
			</label>
			{dimension ? <span className="Form-control__input-dimension">{dimension}</span> : null}
		</div>
	)
}

export default FormControl
