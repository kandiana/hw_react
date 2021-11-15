import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'

import { saveInputSettings } from '../store/actions/settings'
import FormControl from './FormControl'
import Button from './Button'

import ModalWindow from './ModalWindow'

import './SettingsForm.css'
import { useCallback } from 'react'

function SettingsForm() {
	const dispatch = useDispatch()
	const localization = useSelector((state) => state.localization)
	const language = localization.language
	const settingsFormLocalization = localization[language].settings.form

	const [settings, setSettings] = useState(useSelector((state) => state.settings))

	const history = useHistory()

	const [buttonDisabled, changeButtonState] = useState(false)

	// to make error appear after first submit
	const [responseOnSave, changeResponseState] = useState('error')

	// modal window behaviour control
	const [modalWindowShown, changeModalWindowState] = useState(false)

	const toggleModalWindow = useCallback(() => {
		changeModalWindowState((current) => !current)
	}, [])

	// input controls
	const handleInputChange = useCallback((event) => {
		const target = event.target

		setSettings((prev) => ({
			...prev,
			[target.name]: target.value,
		}))
	}, [])

	const saveSettings = () => {
		// save input settings
		dispatch(saveInputSettings(settings))
		sessionStorage.setItem('settings', JSON.stringify(settings))

		// go back to root address
		history.push('/')
	}

	const handleSubmittedForm = (event) => {
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

	// go back to root address
	const goBack = useCallback(
		(event) => {
			event.preventDefault()
			history.push('/')
		},
		[history]
	)

	const filterNonNumbers = useCallback((event) => {
		event.target.value = event.target.value.replace(/\D/g, '')
	}, [])

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
						value={settings.repository}
						onChange={handleInputChange}
						inputMode="text"
					/>
					<FormControl
						id="build-command"
						name="buildCommand"
						label={settingsFormLocalization.buildCommand.label}
						required={true}
						placeholder={settingsFormLocalization.buildCommand.placeholder}
						value={settings.buildCommand}
						onChange={handleInputChange}
						inputMode="text"
					/>
					<FormControl
						id="main-branch"
						name="mainBranch"
						label={settingsFormLocalization.mainBranch.label}
						placeholder={settingsFormLocalization.mainBranch.placeholder}
						value={settings.mainBranch}
						onChange={handleInputChange}
						inputMode="text"
					/>
					<FormControl
						id="synchronization-interval"
						name="interval"
						label={settingsFormLocalization.interval.label}
						value={settings.interval}
						oneline={true}
						dimension={settingsFormLocalization.interval.dimension}
						onInput={filterNonNumbers}
						onChange={handleInputChange}
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
