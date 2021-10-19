import { connect } from 'react-redux'

import { ReactComponent as CogIcon } from '../imgs/cog-icon.svg'
import { ReactComponent as SettingsLogo } from '../imgs/settings-logo.svg'

import Header from '../components/Header'
import Footer from '../components/Footer'
import LinkButton from '../components/LinkButton'

import './Start.css'

function Start(props) {
	let language = props.localization.language

	const headerNavButton = (
		<LinkButton
			key="settings"
			href="/settings"
			buttonType="Button_small"
			children={[
				<CogIcon key="icon" className="Button__icon" />,
				<span key="text" className="Button__text">
					{props.localization[language].header.settings}
				</span>,
			]}
		/>
	)

	return (
		<>
			<Header
				children={headerNavButton}
				page="start"
				title={props.localization[language].header.title}
			/>
			<main className="container Start">
				<h2 className="title visually-hidden">{props.localization[language].start.title}</h2>
				<SettingsLogo />
				<p className="Start__text">{props.localization[language].start.text}</p>
				<LinkButton
					href="/settings"
					buttonType="Button_yellow"
					children={props.localization[language].start.openSettings}
				/>
			</main>
			<Footer />
		</>
	)
}

export default connect((state) => ({
	localization: state.localization,
}))(Start)
