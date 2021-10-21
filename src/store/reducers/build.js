import { buildHistory } from '../../mock-data/build-history'

export const isMobile = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// setting number of build cards to show at once
const BUILD_CARDS_SET_LENGTH = {
	desktop: 9,
	mobile: 6,
}
const buildCardsSetLength = isMobile()
	? BUILD_CARDS_SET_LENGTH.mobile
	: BUILD_CARDS_SET_LENGTH.desktop

const initialState = {
	cardsSetLength: buildCardsSetLength,
	history: [],
	renderMore: false,
}

const buildsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_BUILD_CARDS_SET_LENGTH':
			return {
				...state,
				cardsSetLength: action.setLength,
			}

		case 'CLEAR_BUILD_HISTORY':
			return {
				...state,
				history: [],
				renderMore: true,
			}

		// adding from 'backend'
		case 'ADD_BUILD_HISTORY_ITEMS':
			const newBuildCardsSet = []
			const startIndex = state.history.length

			let i
			let renderMore = true

			for (i = startIndex; i < startIndex + state.cardsSetLength; i++) {
				if (!buildHistory[i]) {
					break
				}

				newBuildCardsSet.push(buildHistory[i])
			}

			if (!buildHistory[i]) {
				renderMore = false
			}

			return {
				...state,
				history: [...state.history, ...newBuildCardsSet],
				renderMore: renderMore,
			}

		default:
			return state
	}
}

export default buildsReducer
