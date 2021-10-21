export const localization = {
	rus: {
		header: {
			title: 'Школьный CI-сервер',
			runBuild: 'Собрать',
			settings: 'Настройки',
		},

		start: {
			title: 'Стартовая страница',
			text: 'Настройте подключение к репозиторию и\u00a0параметры синхронизации',
			openSettings: 'Открыть настройки',
		},

		settings: {
			title: 'Настройки',
			text: 'Настройте подключение к репозиторию и\u00a0параметры синхронизации',
			form: {
				repository: {
					label: 'Репозиторий GitHub',
					placeholder: 'логин/название-репозитория',
				},
				buildCommand: {
					label: 'Команда сборки',
					placeholder: 'команда сборки',
				},
				mainBranch: {
					label: 'Главная ветка',
					placeholder: 'имя главной ветки',
				},
				interval: {
					label: 'Синхронизировать каждые',
					dimension: 'минут',
				},
				buttons: {
					save: 'Сохранить',
					cancel: 'Отмена',
				},
				error: {
					message: 'В процессе клонирования репозитория произошла ошибка. Повторите\u00a0попытку',
					button: 'Закрыть',
				},
			},
		},

		buildHistory: {
			title: 'История сборок',
			text: 'История сборок пуста',
			months: new Map([
				['Jan', 'янв'],
				['Feb', 'февр'],
				['Mar', 'марта'],
				['Apr', 'апр'],
				['May', 'мая'],
				['Jun', 'июня'],
				['Jul', 'июля'],
				['Aug', 'авг'],
				['Sep', 'сент'],
				['Oct', 'окт'],
				['Nov', 'нояб'],
				['Dec', 'дек'],
			]),
			h: 'ч',
			min: 'мин',
			showMore: 'Больше',
			modal: {
				title: 'Новая сборка',
				text: 'Введите хэш коммита, который хотите собрать.',
				placeholder: 'Хэш коммита',
				runBuild: 'Собрать',
				cancel: 'Отмена',
			},
		},

		footer: {
			support: 'Поддержка',
			learning: 'Обучение',
			languageVersion: 'English version',
			copy: 'Диана Глазова',
		},
	},

	eng: {
		header: {
			title: 'School CI server',
			runBuild: 'Run build',
			settings: 'Settings',
		},

		start: {
			title: 'Start page',
			text: 'Configure repository connection and\u00a0synchronization settings',
			openSettings: 'Open settings',
		},

		settings: {
			title: 'Settings',
			text: 'Configure repository connection and\u00a0synchronization settings',
			form: {
				repository: {
					label: 'GitHub repository',
					placeholder: 'user-name/repo-name',
				},
				buildCommand: {
					label: 'Build command',
					placeholder: 'build command',
				},
				mainBranch: {
					label: 'Main branch',
					placeholder: 'main branch name',
				},
				interval: {
					label: 'Synchronize every',
					dimension: 'minutes',
				},
				buttons: {
					save: 'Save',
					cancel: 'Cancel',
				},
				error: {
					message: 'Repository cloning has not ended successfully. Please, try again',
					button: 'Close',
				},
			},
		},

		buildHistory: {
			title: 'Build history',
			text: 'Build history is empty',
			months: new Map([
				['Jan', 'Jan'],
				['Feb', 'Feb'],
				['Mar', 'Mar'],
				['Apr', 'Apr'],
				['May', 'May'],
				['Jun', 'Jun'],
				['Jul', 'Jul'],
				['Aug', 'Aug'],
				['Sep', 'Sep'],
				['Oct', 'Oct'],
				['Nov', 'Nov'],
				['Dec', 'Dec'],
			]),
			h: 'h',
			min: 'min',
			showMore: 'Show more',
			modal: {
				title: 'New Build',
				text: 'Enter the commit hash which you want to build.',
				placeholder: 'Commit hash',
				runBuild: 'Run build',
				cancel: 'Cancel',
			},
		},

		footer: {
			support: 'Support',
			learning: 'Learning',
			languageVersion: 'Русская версия',
			copy: 'Diana Glazova',
		},
	},
}
