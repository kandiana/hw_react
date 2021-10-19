import { useEffect } from 'react'

import useWindowSize from '../hooks/useWindowSize'

import MainTitle from './MainTitle'

import './Header.css'

function Header(props) {
	const windowHeight = useWindowSize()

	useEffect(() => {
		const header = document.querySelector('.Header')
		const headerHeight = header.clientHeight
		const mockHeader = document.querySelector('.Mock-header')
		mockHeader.style.minHeight = `${headerHeight}px`
		mockHeader.style.maxHeight = `${headerHeight}px`

		if (windowHeight > headerHeight * 5) {
			header.classList.add('Header_sticky')
			mockHeader.classList.remove('hidden')
		} else {
			header.classList.remove('Header_sticky')
			mockHeader.classList.add('hidden')
		}

		window.addEventListener('scroll', () => {
			if (window.scrollY === 0) {
				header.classList.remove('Header_bordered')
			} else {
				header.classList.add('Header_bordered')
			}
		})

		return () => {
			window.removeEventListener('scroll', () => {
				if (window.scrollY === 0) {
					header.classList.remove('Header_bordered')
				} else {
					header.classList.add('Header_bordered')
				}
			})
		}
	}, [windowHeight])

	return (
		<>
			<header className="Header">
				<div className="container Header__wrapper">
					<MainTitle title={props.title} page={props.page} />
					<nav>{props.children}</nav>
				</div>
			</header>
			<div className="Mock-header"></div>
		</>
	)
}

export default Header
