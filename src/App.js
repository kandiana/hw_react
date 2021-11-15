import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { store } from './store/store'
import { readSettingsFromSessionStorage } from './store/actions/settings'

import Start from './pages/Start'
import History from './pages/History'
import Settings from './pages/Settings'
import Footer from './components/Footer'

import './App.css'

store.dispatch(readSettingsFromSessionStorage())

function App() {
	const { repository } = useSelector((state) => state.settings)

	return (
		<div className="App">
			<Switch>
				<Route path="/settings">
					<Settings />
				</Route>
				<Route path="/">{repository ? <History /> : <Start />}</Route>
			</Switch>
			<Footer />
		</div>
	)
}

export default App
