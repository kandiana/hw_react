import './BuildTitle.css'

function BuildTitle(props) {
	return (
		<div className="Build-title">
			<span className="Build-title__number" style={{ color: props.color }}>
				{props.number}
			</span>
			<span className="Build-title__message">{props.commitMessage}</span>
		</div>
	)
}

export default BuildTitle
