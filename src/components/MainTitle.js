import './MainTitle.css'

function MainTitle({ page, title }) {
	const classes = page === 'history' ? 'Main-title' : 'Main-title Main-title_gray'

	return <h1 className={classes}>{title}</h1>
}

export default MainTitle
