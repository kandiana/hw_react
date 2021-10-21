import { CHANGE_LANGUAGE } from '../actions/actionTypes'

export function changeLanguage(language) {
	return {
		type: CHANGE_LANGUAGE,
		language,
	}
}
