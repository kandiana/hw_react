import { Link } from 'react-router-dom'

function LinkButton(props) {
	const classNames = `Button ${props.buttonType ? props.buttonType : ''}`

	return (
		<Link to={props.href} className={classNames} onClick={props.onClick}>
			{props.children}
		</Link>
	)
}

export default LinkButton
