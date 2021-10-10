import { connect } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Form from '../components/Form'

import './Settings.css'

function Settings(props) {
	let language = props.localization.language

	return (
		<>
			<Header page="settings" title={props.localization[language].header.title} />
			<main className="Settings">
				<div className="container">
					<h2 className="title Settings__title">{props.localization[language].settings.title}</h2>
					<p className="Settings__text">{props.localization[language].settings.text}</p>
					<Form />
				</div>
			</main>
			<Footer />
		</>
	)
}
export default connect((state) => ({
	localization: state.localization,
}))(Settings)
