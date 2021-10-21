import { connect } from 'react-redux'

import Input from './Input'
import Button from './Button'

import './NewBuildForm.css'

function NewBuildForm({ modalWindowControl, localization }) {
	let language = localization.language
	let buildLocalization = localization[language].buildHistory

	function closeModalWindow(event) {
		event.preventDefault()
		modalWindowControl((current) => !current)
	}

	// label catches click of focuses on input after field clearing
	return (
		<form action="#" className="New-build-form" onSubmit={(event) => event.preventDefault}>
			<h2 className="New-build-form__title">New build</h2>
			<p className="New-build-form__text">Enter the commit hash which you want to build.</p>
			<label>
				<Input
					key="commit-hash"
					placeholder="Commit hash"
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

export default connect((state) => ({
	localization: state.localization,
}))(NewBuildForm)
