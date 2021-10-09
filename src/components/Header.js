import { useEffect } from 'react'
import MainTitle from './MainTitle'

import './Header.css'

function Header(props) {
	useEffect(() => {
		const header = document.querySelector('.Header')
		const headerHeight = header.clientHeight
		const mockHeader = document.querySelector('.Mock-header')
		mockHeader.style.minHeight = `${headerHeight}px`
		mockHeader.style.maxHeight = `${headerHeight}px`

		if (window.innerHeight > headerHeight * 4) {
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
	})

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
