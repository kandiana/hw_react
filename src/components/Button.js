import './Button.css'

function Button(props) {
	const classNames = `Button ${props.buttonType ? props.buttonType : ''}`

	return (
		<button
			type={props.type}
			className={classNames}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	)
}

export default Button
