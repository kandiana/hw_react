import { useSelector } from 'react-redux'

import { ReactComponent as CogIcon } from '../imgs/cog-icon.svg'
import { ReactComponent as SettingsLogo } from '../imgs/settings-logo.svg'

import Header from '../components/Header'
import Footer from '../components/Footer'
import LinkButton from '../components/LinkButton'

import './Start.css'

function Start() {
	const localization = useSelector((state) => state.localization)
	let language = localization.language

	const headerNavButton = (
		<LinkButton key="settings" href="/settings" buttonType="Button_small">
			<CogIcon key="icon" className="Button__icon" />
			<span key="text" className="Button__text">
				{localization[language].header.settings}
			</span>
		</LinkButton>
	)

	return (
		<>
			<Header page="start" title={localization[language].header.title}>
				{headerNavButton}
			</Header>
			<main className="container Start">
				<h2 className="title visually-hidden">{localization[language].start.title}</h2>
				<SettingsLogo />
				<p className="Start__text">{localization[language].start.text}</p>
				<LinkButton href="/settings" buttonType="Button_yellow">
					{localization[language].start.openSettings}
				</LinkButton>
			</main>
			<Footer />
		</>
	)
}

export default Start
