import { combineReducers } from 'redux'
import settingsReducer from './settings'
import buildsReducer from './build'
import localizationReducer from './localization'

export default combineReducers({
	settings: settingsReducer,
	build: buildsReducer,
	localization: localizationReducer,
})
