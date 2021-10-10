import { createStore } from 'redux'
import { buildHistory } from './mock-data/build-history'
import { localization } from './localization'

export const isMobile = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// setting number of build cards to show at once
const BUILD_CARDS_SET_LENGTH = {
	desktop: 9,
	mobile: 6,
}
const buildCardsSetLength = isMobile() ? BUILD_CARDS_SET_LENGTH.mobile : BUILD_CARDS_SET_LENGTH.desktop

// default synchronization interval in minutes
const SYNCHRONIZATION_INTERVAL = 10

const initialState = {
	interval: SYNCHRONIZATION_INTERVAL,
	build: {
		cardsSetLength: buildCardsSetLength,
		history: [],
		renderMore: false,
	},
	localization: {
		rus: localization.rus,
		eng: localization.eng,
		language: localStorage.getItem('language') ? localStorage.getItem('language') : 'eng',
	},
}

const settings = (state = initialState, action) => {
	switch (action.type) {
		case 'READ_SETTINGS_FROM_LOCAL_STORAGE':
			return { ...state, ...JSON.parse(localStorage.getItem('settings')) }

		case 'SET_BUILD_CARDS_SET_LENGTH':
			return {
				...state,
				buildCardsSetLength: action.setLength,
			}

		case 'CLEAR_BUILD_HISTORY':
			return {
				...state,
				build: {
					...state.build,
					history: [],
					renderMore: true,
				},
			}

		// adding from 'backend'
		case 'ADD_BUILD_HISTORY_ITEMS':
			const newBuildCardsSet = []
			const startIndex = state.build.history.length

			let i
			let renderMore = true

			for (i = startIndex; i < startIndex + state.build.cardsSetLength; i++) {
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
				build: {
					...state.build,
					history: [...state.build.history, ...newBuildCardsSet],
					renderMore: renderMore,
				},
			}

		case 'SAVE_INPUT_SETTINGS':
			return { ...state, ...action.input }

		case 'CHANGE_LANGUAGE':
			localStorage.setItem('language', action.language)
			return {
				...state,
				localization: {
					...state.localization,
					language: action.language,
				},
			}

		default:
			return state
	}
}

export const store = createStore(settings)
