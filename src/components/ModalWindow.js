import { useState, useEffect } from 'react'
import './ModalWindow.css'

function ModalWindow({ hidden, children }) {
	const [scrollPosition, updateScrollPosition] = useState(0)

	const showModal = () => {
		document.body.style.top = `${-window.scrollY}px`
		updateScrollPosition(window.scrollY)
		document.body.style.left = 0
		document.body.style.right = 0
		document.body.style.position = 'fixed'
	}

	const hideModal = () => {
		document.body.style.position = ''
		window.scrollTo(0, scrollPosition)
		updateScrollPosition(window.scrollY)
		document.body.style.top = ''
		document.body.style.left = ''
		document.body.style.right = ''
	}

	useEffect(() => {
		if (hidden) {
			hideModal()
		} else {
			showModal()
		}
	})

	return (
		<div className={`Modal-window-box ${hidden ? 'hidden' : ''}`}>
			<div className="Modal-window">{children}</div>
		</div>
	)
}

export default ModalWindow
