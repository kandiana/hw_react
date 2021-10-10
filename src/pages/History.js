import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { ReactComponent as CogIcon } from '../imgs/cog-icon.svg'
import { ReactComponent as PlayIcon } from '../imgs/play-icon.svg'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import LinkButton from '../components/LinkButton'
import BuildCard from '../components/BuildCard'

import ModalWindow from '../components/ModalWindow'
import NewBuildForm from '../components/NewBuildForm'

import './History.css'

function History(props) {
	let language = props.localization.language

	const headerNavButtons = [
		<Button
			key="build"
			buttonType="Button_small"
			onClick={openModalWindow}
			children={[
				<PlayIcon key="icon" className="Button__icon" />,
				<span key="text" className="Button__text">
					{props.localization[language].header.runBuild}
				</span>,
			]}
		/>,
		<LinkButton
			key="settings"
			href="/settings"
			buttonType="Button_small"
			children={<CogIcon className="Button__icon" />}
		/>,
	]

	// render first batch of build history cards (only once after initial component render)
	useEffect(() => {
		props.dispatch({ type: 'CLEAR_BUILD_HISTORY' })
		props.dispatch({ type: 'ADD_BUILD_HISTORY_ITEMS' })

		return () => {
			props.dispatch({ type: 'CLEAR_BUILD_HISTORY' })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// if not all build cards are shown, render 'show more' button
	const showMoreButtonType = `Button_changing-size ${props.build.renderMore ? '' : 'hidden'}`

	function renderCards() {
		const arrayOfCards = []
		for (let i = 0; i < props.build.history.length; i++) {
			arrayOfCards.push(
				<BuildCard
					key={props.build.history[i].id}
					id={props.build.history[i].id}
					status={props.build.history[i].status}
					content={props.build.history[i].content}
				/>
			)
		}

		if (arrayOfCards.length === 0) {
			return <p className="History__text">{props.localization[language].buildHistory.text}</p>
		}

		return arrayOfCards
	}

	// renders next batch of build cards
	function showMore() {
		props.dispatch({ type: 'ADD_BUILD_HISTORY_ITEMS' })
	}

	// modal window behaviour control
	const [modalWindowShown, changeModalWindowState] = useState(false)

	function openModalWindow() {
		changeModalWindowState((current) => !current)
	}

	return (
		<>
			<Header children={headerNavButtons} page="history" title={props.repository} />
			<main className="History">
				<h2 className="title visually-hidden">{props.localization[language].buildHistory.title}</h2>
				<div className="container">
					{renderCards()}
					<Button
						buttonType={showMoreButtonType}
						children={props.localization[language].buildHistory.showMore}
						onClick={showMore}
					/>
				</div>
			</main>
			<Footer />
			{ReactDOM.createPortal(
				<ModalWindow
					key="modal-window"
					children={<NewBuildForm modalWindowControl={changeModalWindowState} />}
					hidden={!modalWindowShown}
				/>,
				document.getElementById('modal')
			)}
		</>
	)
}

export default connect((state) => ({
	repository: state.repository,
	build: state.build,
	localization: state.localization,
}))(History)
