import './MainTitle.css'

function MainTitle(props) {
	const classes = props.page === 'history' ? 'Main-title' : 'Main-title Main-title_gray'

	return <h1 className={classes}>{props.title}</h1>
}

export default MainTitle
