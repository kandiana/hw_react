import { ReactComponent as CogIcon } from '../imgs/cog-icon.svg'
import { ReactComponent as SettingsLogo } from '../imgs/settings-logo.svg'

import Header from '../components/Header'
import Footer from '../components/Footer'
import LinkButton from '../components/LinkButton'

import './Start.css'

function Start() {
	const headerNavButton = (
		<LinkButton
			key="settings"
			href="/settings"
			buttonType="Button_small"
			children={[
				<CogIcon key="icon" className="Button__icon" />,
				<span key="text" className="Button__text">
					Settings
				</span>,
			]}
		/>
	)

	return (
		<>
			<Header children={headerNavButton} page="start" title="School CI server" />
			<main className="container Start">
				<h2 className="title visually-hidden">Start page</h2>
				<SettingsLogo />
				<p className="Start__text">Configure repository connection and&nbsp;synchronization settings</p>
				<LinkButton href="/settings" buttonType="Button_yellow" children="Open settings" />
			</main>
			<Footer />
		</>
	)
}

export default Start
