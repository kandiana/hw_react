import Input from './Input'

import './FormControl.css'

function FormControl(props) {
	const blockClasses = `Form-control ${props.oneline ? 'Form-control_oneline' : ''}`

	return (
		<div className={blockClasses}>
			<label>
				<span className="Form-control__label">
					{props.label}
					{props.required ? <span className="Form-control_requred">*</span> : null}
				</span>
				<Input
					inline={props.oneline}
					placeholder={props.placeholder}
					name={props.name}
					value={props.value}
					required={props.required}
					onInput={props.onInput}
					data-value={props['data-value']}
				/>
			</label>
			{props.dimension ? <span className="Form-control__input-dimension">{props.dimension}</span> : null}
		</div>
	)
}

export default FormControl
