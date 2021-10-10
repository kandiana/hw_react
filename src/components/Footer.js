import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './Link.css'
import './Footer.css'

function Footer(props) {
	let language = props.localization.language

	function changeLocalization(event) {
		event.preventDefault()
		language = language === 'rus' ? 'eng' : 'rus'
		props.dispatch({ type: 'CHANGE_LANGUAGE', language: language })
	}

	return (
		<footer className="Footer">
			<div className="container Footer__wrapper">
				<div className="Footer__nav">
					<Link to="/" className="Link">
						{props.localization[language].footer.support}
					</Link>
					<Link to="/" className="Link">
						{props.localization[language].footer.learning}
					</Link>
					<Link to="/" className="Link" onClick={changeLocalization}>
						{props.localization[language].footer.languageVersion}
					</Link>
				</div>
				<p className="Footer__copy">&copy; 2021 {props.localization[language].footer.copy}</p>
			</div>
		</footer>
	)
}

export default connect((state) => ({
	localization: state.localization,
}))(Footer)
