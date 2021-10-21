import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import useWindowSize from './hooks/useWindowSize'
import { store, isMobile } from './store'

import Start from './pages/Start'
import History from './pages/History'
import Settings from './pages/Settings'

import './App.css'

//store.dispatch({ type: '' })
store.dispatch({ type: 'READ_SETTINGS_FROM_LOCAL_STORAGE' })

function App(props) {
	return (
		<div className="App">
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
