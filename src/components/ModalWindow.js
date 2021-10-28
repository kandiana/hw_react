import { useState, useEffect } from 'react'
import './ModalWindow.css'

function ModalWindow({ hidden, children }) {
	const [scrollPosition, updateScrollPosition] = useState(0)

	const showModal = () => {
		document.body.style.top = `${-window.scrollY}px`
		updateScrollPosition(window.scrollY)
		document.body.classList.add('body_modal')
	}

	const hideModal = () => {
		document.body.classList.remove('body_modal')
		window.scrollTo(0, scrollPosition)
		updateScrollPosition(window.scrollY)
	}

	useEffect(() => {
		if (hidden) {
			hideModal()
		} else {
			showModal()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hidden])

	return (
		<div className={`Modal-window-box ${hidden ? 'hidden' : ''}`}>
			<div className="Modal-window">{children}</div>
		</div>
	)
}

export default ModalWindow
