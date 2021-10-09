import Input from './Input'
import Button from './Button'

import './NewBuildForm.css'

function NewBuildForm(props) {
	function closeModalWindow(event) {
		event.preventDefault()
		props.modalWindowControl((current) => !current)
	}

	// label ловит клик и фокусирует на инпуте после очистки
	return (
		<form action="#" className="New-build-form" onSubmit={(event) => event.preventDefault}>
			<h2 className="New-build-form__title">New build</h2>
			<p className="New-build-form__text">Enter the commit hash which you want to build.</p>
			<label>
				<Input key="commit-hash" placeholder="Commit hash" name="commitHash" data-value="text" />
			</label>
			<div className="New-build-form__form-buttons">
				<Button buttonType="Button_yellow" children="Run build" onClick={closeModalWindow} />
				<Button children="Cancel" onClick={closeModalWindow} />
			</div>
		</form>
	)
}

export default NewBuildForm
