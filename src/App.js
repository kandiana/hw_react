import { Switch, Route } from 'react-router-dom'
import { useState } from 'react'

import useWindowSize from './hooks/useWindowSize'

import Start from './pages/Start'
import History from './pages/History'
import Settings from './pages/Settings'

import './App.css'

function App() {
	const isMobile = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
	}

	// to avoid scrolling on mobile devices due to address line
	const windowHeight = useWindowSize()
	const appHeight = isMobile() ? `${windowHeight}px` : '100vh'

	// setting number of build cards to show at once (need to move numbers to global constants?)
	const buildCardsSetLength = isMobile() ? 6 : 9

	// reading settings from local storage if there are any
	const settingsState = JSON.parse(localStorage.getItem('settings'))
	const [settings, updateSettings] = useState(
		settingsState ? settingsState : { repository: '', 'build-command': '', 'main-branch': '', interval: '10' }
	)

	return (
		<div className="App" style={{ height: appHeight }}>
			<Switch>
				<Route path="/settings">
					<Settings update={updateSettings} settings={settings} />
				</Route>
				<Route path="/">
					{settings.repository ? <History settings={settings} cardsSetLength={buildCardsSetLength} /> : <Start />}
				</Route>
			</Switch>
		</div>
	)
}

export default App
