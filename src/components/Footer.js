import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './Link.css'
import './Footer.css'

function Footer() {
	const dispatch = useDispatch()
	const localization = useSelector((state) => state.localization)
	let language = localization.language

	function blockLink(event) {
		event.preventDefault()
	}

	function changeLocalization(event) {
		event.preventDefault()
		language = language === 'rus' ? 'eng' : 'rus'
		dispatch({ type: 'CHANGE_LANGUAGE', language: language })
	}

	return (
		<footer className="Footer">
			<div className="container Footer__wrapper">
				<div className="Footer__nav">
					<Link to="/" className="Link" onClick={blockLink}>
						{localization[language].footer.support}
					</Link>
					<Link to="/" className="Link" onClick={blockLink}>
						{localization[language].footer.learning}
					</Link>
					<Link to="/" className="Link" onClick={changeLocalization}>
						{localization[language].footer.languageVersion}
					</Link>
				</div>
				<p className="Footer__copy">&copy; 2021 {localization[language].footer.copy}</p>
			</div>
		</footer>
	)
}

export default Footer
