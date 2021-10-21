import { READ_SETTINGS_FROM_LOCAL_STORAGE, SAVE_INPUT_SETTINGS } from '../actions/actionTypes'

export function readSettingsFromLocalStorage() {
	return {
		type: READ_SETTINGS_FROM_LOCAL_STORAGE,
	}
}

export function saveInputSettings(input) {
	return {
		type: SAVE_INPUT_SETTINGS,
		input,
	}
}
