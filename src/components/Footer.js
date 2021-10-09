import { Link } from 'react-router-dom'

import './Link.css'
import './Footer.css'

function Footer() {
	function changeLocalization(event) {
		event.preventDefault()
	}

	return (
		<footer className="Footer">
			<div className="container Footer__wrapper">
				<div className="Footer__nav">
					<Link to="/" className="Link">
						Support
					</Link>
					<Link to="/" className="Link">
						Learning
					</Link>
					<Link to="/" className="Link" onClick={changeLocalization}>
						Русская версия
					</Link>
				</div>
				<p className="Footer__copy">&copy; 2021 Diana Glazova</p>
			</div>
		</footer>
	)
}

export default Footer
