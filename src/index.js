import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store'

import './index.css'
import App from './App'

store.dispatch({ type: '' })
store.dispatch({ type: 'READ_FROM_LOCAL_STORAGE' })

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
