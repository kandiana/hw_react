import { useSelector } from 'react-redux'

import Input from './Input'
import Button from './Button'

import './NewBuildForm.css'

function NewBuildForm({ modalWindowControl }) {
	const localization = useSelector((state) => state.localization)
	const language = localization.language
	const buildLocalization = localization[language].buildHistory

	function closeModalWindow(event) {
		event.preventDefault()
		modalWindowControl((current) => !current)
	}

	// label catches click of focuses on input after field clearing
	return (
		<form action="#" className="New-build-form" onSubmit={(event) => event.preventDefault}>
			<h2 className="New-build-form__title">{buildLocalization.modal.title}</h2>
			<p className="New-build-form__text">{buildLocalization.modal.text}</p>
			<label>
				<Input
					key="commit-hash"
					placeholder={buildLocalization.modal.placeholder}
					name="commitHash"
					data-value="text"
					inputmode="text"
				/>
			</label>
			<div className="New-build-form__form-buttons">
				<Button buttonType="Button_yellow" onClick={closeModalWindow}>
					{buildLocalization.modal.runBuild}
				</Button>
				<Button onClick={closeModalWindow}>{buildLocalization.modal.cancel}</Button>
			</div>
		</form>
	)
}

export default NewBuildForm
