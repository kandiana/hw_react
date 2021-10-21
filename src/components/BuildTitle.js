import './BuildTitle.css'

function BuildTitle({ color, number, commitMessage }) {
	return (
		<div className="Build-title">
			<span className="Build-title__number" style={{ color: color }}>
				{number}
			</span>
			<span className="Build-title__message">{commitMessage}</span>
		</div>
	)
}

export default BuildTitle
