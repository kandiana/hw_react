import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import useWindowSize from './hooks/useWindowSize'
import { isMobile } from './store'

import Start from './pages/Start'
import History from './pages/History'
import Settings from './pages/Settings'

import './App.css'

function App(props) {
	// to avoid scrolling on mobile devices due to address line
	const windowHeight = useWindowSize()
	const appHeight = isMobile() ? `${windowHeight}px` : '100vh'

	return (
		<div className="App" style={{ height: appHeight }}>
			<Switch>
				<Route path="/settings">
					<Settings />
				</Route>
				<Route path="/">{props.repository ? <History /> : <Start />}</Route>
			</Switch>
		</div>
	)
}

export default connect((state) => ({
	repository: state.repository,
	buildCardsSetLength: state.buildCardsSetLength,
}))(App)
