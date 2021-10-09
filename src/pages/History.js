import { useState } from 'react'
import ReactDOM from 'react-dom'
import { buildHistory } from '../mock-data/build-history'

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
	localStorage.setItem('settings', JSON.stringify(props.settings))

	const headerNavButtons = [
		<Button
			key="build"
			buttonType="Button_small"
			onClick={openModalWindow}
			children={[
				<PlayIcon key="icon" className="Button__icon" />,
				<span key="text" className="Button__text">
					Run build
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

	// number of build cards that shows at loading page
	const startnumberOfCards = props.cardsSetLength
	// if not all build cards are shown, 'show more' button appears, else it doesn't appear
	const showMoreButtonType = `Button_changing-size ${buildHistory.length > startnumberOfCards ? '' : 'hidden'}`
	// state to follow number of rendered cards
	const [numberOfBuildCards, updateNumber] = useState(startnumberOfCards)

	function renderCards() {
		const arrayOfCards = []
		for (let i = 0; i < Math.min(buildHistory.length, numberOfBuildCards); i++) {
			arrayOfCards.push(
				<BuildCard
					key={buildHistory[i].id}
					id={buildHistory[i].id}
					status={buildHistory[i].status}
					content={buildHistory[i].content}
				/>
			)
		}

		if (arrayOfCards.length === 0) {
			return <p className="History__text">Build history is empty</p>
		}

		return arrayOfCards
	}

	// renders next batch of build cards
	function showMore(event) {
		if (numberOfBuildCards + startnumberOfCards >= buildHistory.length) {
			event.target.classList.add('hidden')
		}
		updateNumber((numberOfBuildCards) => numberOfBuildCards + startnumberOfCards)
	}

	// modal window behaviour control
	const [modalWindowShown, changeModalWindowState] = useState(false)

	function openModalWindow() {
		changeModalWindowState((current) => !current)
	}

	return (
		<>
			<Header children={headerNavButtons} page="history" title={props.settings.repository} />
			<main className="History">
				<h2 className="title visually-hidden">Build history</h2>
				<div className="container">
					{renderCards()}
					<Button buttonType={showMoreButtonType} children="Show more" onClick={showMore} />
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

export default History
