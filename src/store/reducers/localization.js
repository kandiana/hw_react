import { CHANGE_LANGUAGE } from '../actions/actionTypes'

import { localization } from '../localization'

const initialState = {
	rus: localization.rus,
	eng: localization.eng,
	language: sessionStorage.getItem('language') ? sessionStorage.getItem('language') : 'eng',
}

const localizationReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_LANGUAGE:
			sessionStorage.setItem('language', action.language)
			return {
				...state,
				language: action.language,
			}

		default:
			return state
	}
}

export default localizationReducer
