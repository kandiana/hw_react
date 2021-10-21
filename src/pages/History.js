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

function History({ repository, build, dispatch, localization }) {
	let language = localization.language

	const headerNavButtons = [
		<Button key="build" buttonType="Button_small" onClick={openModalWindow}>
			<PlayIcon key="icon" className="Button__icon" />
			<span key="text" className="Button__text">
				{localization[language].header.runBuild}
			</span>
		</Button>,
		<LinkButton key="settings" href="/settings" buttonType="Button_small">
			<CogIcon className="Button__icon" />
		</LinkButton>,
	]

	// render first batch of build history cards (only once after initial component render)
	useEffect(() => {
		dispatch({ type: 'CLEAR_BUILD_HISTORY' })
		dispatch({ type: 'ADD_BUILD_HISTORY_ITEMS' })

		return () => {
			dispatch({ type: 'CLEAR_BUILD_HISTORY' })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// if not all build cards are shown, render 'show more' button
	const showMoreButtonType = `Button_changing-size ${build.renderMore ? '' : 'hidden'}`

	function renderCards() {
		const arrayOfCards = []

		build.history.forEach((commit) =>
			arrayOfCards.push(
				<BuildCard key={commit.id} id={commit.id} status={commit.status} content={commit.content} />
			)
		)

		if (arrayOfCards.length === 0) {
			return <p className="History__text">{localization[language].buildHistory.text}</p>
		}

		return arrayOfCards
	}

	// renders next batch of build cards
	function showMore() {
		dispatch({ type: 'ADD_BUILD_HISTORY_ITEMS' })
	}

	// modal window behaviour control
	const [modalWindowShown, changeModalWindowState] = useState(false)

	function openModalWindow() {
		changeModalWindowState((current) => !current)
	}

	return (
		<>
			<Header children={headerNavButtons} page="history" title={repository} />
			<main className="History">
				<h2 className="title visually-hidden">{localization[language].buildHistory.title}</h2>
				<div className="container">
					{renderCards()}
					<Button
						key="showMore"
						buttonType={showMoreButtonType}
						children={localization[language].buildHistory.showMore}
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
