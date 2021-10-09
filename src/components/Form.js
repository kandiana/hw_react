import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import ReactDOM from 'react-dom'

import FormControl from './FormControl'
import Button from './Button'

import ModalWindow from '../components/ModalWindow'

import './Form.css'

function Form(props) {
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
		props.update(() => {
			const newSettings = {}
			const formElements = event.target.elements

			for (let index in formElements) {
				const element = formElements[index]

				// saving only unempty input data
				if (element.tagName === 'INPUT' && element.name && element.value) {
					if (element.dataset.value === 'number') {
						newSettings[element.name] = Number(element.value)
					} else {
						newSettings[element.name] = element.value
					}
				}
			}

			return newSettings
		})

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
						label="GitHub repository "
						required={true}
						placeholder="user-name/repo-name"
						value={props.settings.repository}
						data-value="text"
					/>
					<FormControl
						id="build-command"
						name="build-command"
						label="Build command "
						required={true}
						placeholder="build command"
						value={props.settings['build-command']}
						data-value="text"
					/>
					<FormControl
						id="main-branch"
						name="main-branch"
						label="Main branch"
						placeholder="main branch name"
						value={props.settings['main-branch']}
						data-value="text"
					/>
					<FormControl
						id="synchronization-interval"
						name="interval"
						label="Synchronize every"
						value={props.settings.interval}
						oneline={true}
						dimension="minutes"
						onInput={filterNonNumbers}
						data-value="number"
					/>
				</div>
				<div className="Form__buttons">
					<Button buttonType="Button_yellow" children="Save" disabled={buttonDisabled} type="submit" />
					<Button children="Cancel" disabled={buttonDisabled} onClick={goBack} />
				</div>
			</form>

			{ReactDOM.createPortal(
				<ModalWindow
					key="modal-window"
					children={
						<div className="Form__error-wrapper">
							<p className="Form__error-message">
								Repository cloning has not ended successfully. Please, try again
							</p>
							<Button children="Close" onClick={toggleModalWindow} />
						</div>
					}
					hidden={!modalWindowShown}
				/>,
				document.getElementById('modal')
			)}
		</>
	)
}

export default Form
