import React, { useEffect, useRef } from 'react'

import useWindowSize from '../hooks/useWindowSize'

import MainTitle from './MainTitle'

import './Header.css'

function Header({ title, page, children }) {
	// need to show/remove sticky header depending on window size
	const [windowHeight, windowWidth] = useWindowSize()
	const header = useRef()

	useEffect(() => {
		const headerHeight = header.current.clientHeight

		if (windowHeight > headerHeight * 5) {
			header.current.classList.add('Header_sticky')
		} else {
			header.current.classList.remove('Header_sticky')
		}

		const toggleHeaderBorder = () => {
			if (window.scrollY === 0) {
				header.current.classList.remove('Header_bordered')
			} else {
				header.current.classList.add('Header_bordered')
			}
		}

		window.addEventListener('scroll', toggleHeaderBorder)

		return () => {
			window.removeEventListener('scroll', toggleHeaderBorder)
		}
	}, [windowHeight, windowWidth])

	return (
		<>
			<header className="Header" ref={header}>
				<div className="container Header__wrapper">
					<MainTitle title={title} page={page} />
					<nav>{children}</nav>
				</div>
			</header>
		</>
	)
}

export default React.memo(Header)
