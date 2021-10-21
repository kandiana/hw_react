import './Button.css'

function Button({ type, buttonType, onClick, disabled, children }) {
	const classNames = `Button ${buttonType ? buttonType : ''}`

	return (
		<button type={type} className={classNames} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	)
}

export default Button
