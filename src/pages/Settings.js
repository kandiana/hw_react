import { useSelector } from 'react-redux'

import Header from '../components/Header'
import SettingsForm from '../components/SettingsForm'

import './Settings.css'

function Settings() {
	const localization = useSelector((state) => state.localization)
	const language = localization.language

	return (
		<>
			<Header page="settings" title={localization[language].header.title} />
			<main className="Settings">
				<div className="container">
					<h2 className="title Settings__title">{localization[language].settings.title}</h2>
					<p className="Settings__text">{localization[language].settings.text}</p>
					<SettingsForm />
				</div>
			</main>
		</>
	)
}
export default Settings
