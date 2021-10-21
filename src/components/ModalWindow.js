import { useState, useEffect } from 'react'
import './ModalWindow.css'

function ModalWindow({ hidden, children }) {
	const [scrollPosition, updateScrollPosition] = useState(0)

	function showModal() {
		document.body.style.top = `${-window.scrollY}px`
		updateScrollPosition(window.scrollY)
		document.body.style.left = 0
		document.body.style.right = 0
		document.body.style.position = 'fixed'
	}

	function hideModal() {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hidden])

	return (
		<div className={`Modal-window-box ${hidden ? 'hidden' : ''}`}>
			<div className="Modal-window">{children}</div>
		</div>
	)
}

export default ModalWindow
