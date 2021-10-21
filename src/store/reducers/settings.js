import { READ_SETTINGS_FROM_LOCAL_STORAGE, SAVE_INPUT_SETTINGS } from '../actions/actionTypes'

// default synchronization interval in minutes
const SYNCHRONIZATION_INTERVAL = 10

const initialState = {
	interval: SYNCHRONIZATION_INTERVAL,
}

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case READ_SETTINGS_FROM_LOCAL_STORAGE:
			return {
				...state,
				...JSON.parse(localStorage.getItem('settings')),
			}

		case SAVE_INPUT_SETTINGS:
			return { ...state, ...action.input }

		default:
			return state
	}
}

export default settingsReducer
