import { Link } from 'react-router-dom'

function LinkButton({ href, buttonType, onClick, children }) {
	const classNames = `Button ${buttonType ? buttonType : ''}`

	return (
		<Link to={href} className={classNames} onClick={onClick}>
			{children}
		</Link>
	)
}

export default LinkButton
