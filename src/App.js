import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { store } from './store/store'

import Start from './pages/Start'
import History from './pages/History'
import Settings from './pages/Settings'

import './App.css'

store.dispatch({ type: 'READ_SETTINGS_FROM_LOCAL_STORAGE' })

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
		</div>
	)
}

export default App
