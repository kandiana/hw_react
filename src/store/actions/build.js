import {
	SET_BUILD_CARDS_SET_LENGTH,
	CLEAR_BUILD_HISTORY,
	ADD_BUILD_HISTORY_ITEMS,
} from '../actions/actionTypes'

export function setBuildCardsSetLength(setLength) {
	return {
		type: SET_BUILD_CARDS_SET_LENGTH,
		setLength,
	}
}

export function clearBuildHistory() {
	return {
		type: CLEAR_BUILD_HISTORY,
	}
}

export function addBuildHistoryItems() {
	return {
		type: ADD_BUILD_HISTORY_ITEMS,
	}
}
