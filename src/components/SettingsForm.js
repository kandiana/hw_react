import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'

import FormControl from './FormControl'
import Button from './Button'

import ModalWindow from './ModalWindow'

import './SettingsForm.css'

function SettingsForm() {
	const dispatch = useDispatch()
	const localization = useSelector((state) => state.localization)
	const language = localization.language
	const settingsFormLocalization = localization[language].settings.form

	const { repository, buildCommand, mainBranch, interval } = useSelector((state) => state.settings)

	const history = useHistory()

	const [buttonDisabled, changeButtonState] = useState(false)

	// to make error appear after first submit
	const [responseOnSave, changeResponseState] = useState('error')

	async function handleSubmittedForm(event) {
		event.preventDefault()

		event.target.blur()
		changeButtonState((current) => !current)

		// to check that buttons get disabled
		setTimeout(() => {
			// enable buttons
			changeButtonState((current) => !current)

			switch (responseOnSave) {
				case 'ok':
					saveSettings(event)
					break

				default:
					toggleModalWindow()
					changeResponseState('ok')
					break
			}
		}, 2000)
	}

	function saveSettings(event) {
		// save input settings
		const newSettings = {}
		const formElements = event.target.elements

		for (let index in formElements) {
			const element = formElements[index]

			// saving only values from unempty inputs
			if (element.tagName === 'INPUT' && element.name && element.value) {
				if (element.dataset.value === 'number') {
					newSettings[element.name] = Number(element.value)
				} else {
					newSettings[element.name] = element.value
				}
			}
		}

		dispatch({ type: 'SAVE_INPUT_SETTINGS', input: newSettings })

		const oldSettings = JSON.parse(localStorage.getItem('settings'))
		const wholeSettings = { ...oldSettings, ...newSettings }
		localStorage.setItem('settings', JSON.stringify(wholeSettings))

		// go back to root address
		history.push('/')
	}

	// go back to root address
	function goBack(event) {
		event.preventDefault()
		history.push('/')
	}

	function filterNonNumbers(event) {
		event.target.value = event.target.value.replace(/\D/g, '')
	}

	// modal window behaviour control
	const [modalWindowShown, changeModalWindowState] = useState(false)

	function toggleModalWindow() {
		changeModalWindowState((current) => !current)
	}

	return (
		<>
			<form action="#" onSubmit={handleSubmittedForm}>
				<div className="Form__inputs">
					<FormControl
						id="repository"
						name="repository"
						label={settingsFormLocalization.repository.label}
						required={true}
						placeholder={settingsFormLocalization.repository.placeholder}
						value={repository}
						dataValue="text"
						inputMode="text"
					/>
					<FormControl
						id="build-command"
						name="buildCommand"
						label={settingsFormLocalization.buildCommand.label}
						required={true}
						placeholder={settingsFormLocalization.buildCommand.placeholder}
						value={buildCommand}
						dataValue="text"
						inputMode="text"
					/>
					<FormControl
						id="main-branch"
						name="mainBranch"
						label={settingsFormLocalization.mainBranch.label}
						placeholder={settingsFormLocalization.mainBranch.placeholder}
						value={mainBranch}
						dataValue="text"
						inputMode="text"
					/>
					<FormControl
						id="synchronization-interval"
						name="interval"
						label={settingsFormLocalization.interval.label}
						value={interval}
						oneline={true}
						dimension={settingsFormLocalization.interval.dimension}
						onInput={filterNonNumbers}
						dataValue="number"
						inputMode="numeric"
					/>
				</div>
				<div className="Form__buttons">
					<Button buttonType="Button_yellow" disabled={buttonDisabled} type="submit">
						{settingsFormLocalization.buttons.save}
					</Button>
					<Button disabled={buttonDisabled} onClick={goBack}>
						{settingsFormLocalization.buttons.cancel}
					</Button>
				</div>
			</form>

			{ReactDOM.createPortal(
				<ModalWindow
					key="modal-window"
					children={
						<div className="Form__error-wrapper">
							<p className="Form__error-message">{settingsFormLocalization.error.message}</p>
							<Button onClick={toggleModalWindow}>{settingsFormLocalization.error.button}</Button>
						</div>
					}
					hidden={!modalWindowShown}
				/>,
				document.getElementById('modal')
			)}
		</>
	)
}

export default SettingsForm
