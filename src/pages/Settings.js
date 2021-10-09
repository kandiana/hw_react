import Header from '../components/Header'
import Footer from '../components/Footer'
import Form from '../components/Form'

import './Settings.css'

function Settings() {
	return (
		<>
			<Header page="settings" title="School CI server" />
			<main className="Settings">
				<div className="container">
					<h2 className="title Settings__title">Settings</h2>
					<p className="Settings__text">Configure repository connection and&nbsp;synchronization settings.</p>
					<Form />
				</div>
			</main>
			<Footer />
		</>
	)
}
export default Settings
