import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import FormControl from './FormControl'
import Button from './Button'

import ModalWindow from '../components/ModalWindow'

import './Form.css'

function Form(props) {
	let language = props.localization.language
	let localization = props.localization[language].settings.form

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

		props.dispatch({ type: 'SAVE_INPUT_SETTINGS', input: newSettings })

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
						label={localization.repository.label}
						required={true}
						placeholder={localization.repository.placeholder}
						value={props.repository}
						data-value="text"
						inputMode="text"
					/>
					<FormControl
						id="build-command"
						name="buildCommand"
						label={localization.buildCommand.label}
						required={true}
						placeholder={localization.buildCommand.placeholder}
						value={props.buildCommand}
						data-value="text"
						inputMode="text"
					/>
					<FormControl
						id="main-branch"
						name="mainBranch"
						label={localization.mainBranch.label}
						placeholder={localization.mainBranch.placeholder}
						value={props.mainBranch}
						data-value="text"
						inputMode="text"
					/>
					<FormControl
						id="synchronization-interval"
						name="interval"
						label={localization.interval.label}
						value={props.interval}
						oneline={true}
						dimension={localization.interval.dimension}
						onInput={filterNonNumbers}
						data-value="number"
						inputMode="numeric"
					/>
				</div>
				<div className="Form__buttons">
					<Button
						buttonType="Button_yellow"
						children={localization.buttons.save}
						disabled={buttonDisabled}
						type="submit"
					/>
					<Button
						children={localization.buttons.cancel}
						disabled={buttonDisabled}
						onClick={goBack}
					/>
				</div>
			</form>

			{ReactDOM.createPortal(
				<ModalWindow
					key="modal-window"
					children={
						<div className="Form__error-wrapper">
							<p className="Form__error-message">{localization.error.message}</p>
							<Button children={localization.error.button} onClick={toggleModalWindow} />
						</div>
					}
					hidden={!modalWindowShown}
				/>,
				document.getElementById('modal')
			)}
		</>
	)
}

export default connect((state) => ({
	repository: state.repository,
	buildCommand: state.buildCommand,
	mainBranch: state.mainBranch,
	interval: state.interval,
	localization: state.localization,
}))(Form)
