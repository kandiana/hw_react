import { connect } from 'react-redux'
import { format, formatDuration } from 'date-fns'

import { ReactComponent as OkIcon } from '../imgs/build-icon_ok.svg'
import { ReactComponent as ErrorIcon } from '../imgs/build-icon_error.svg'
import { ReactComponent as TimeoutIcon } from '../imgs/build-icon_timeout.svg'

import BuildTitle from './BuildTitle'
import CommitInfo from './CommitInfo'
import BuildTime from './BuildTime'

import './BuildCard.css'

function BuildCard({ id, status, content, localization }) {
	let language = localization.language

	//setting icon shape and color depending on build status
	const statusColor = `var(--color-${status})`
	const iconElement = () => {
		switch (status) {
			case 'ok':
				return <OkIcon className="Build-card__status-icon" style={{ fill: statusColor }} />
			case 'error':
				return <ErrorIcon className="Build-card__status-icon" style={{ fill: statusColor }} />
			case 'timeout':
				return <TimeoutIcon className="Build-card__status-icon" style={{ fill: statusColor }} />
			default:
				return null
		}
	}

	// formatting date and duration to our needs
	function setMonthsName(match) {
		return localization[language].buildHistory.months.get(match)
	}
	const formattedDate = format(content.date, 'dd MMM, HH:mm').replace(
		/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/,
		setMonthsName
	)
	const formattedDuration = formatDuration(content.duration, { format: ['hours', 'minutes'] })
		.replace('hour', localization[language].buildHistory.h)
		.replace('minutes', localization[language].buildHistory.min)

	return (
		<div className="Build-card">
			{iconElement()}
			<div className="Build-card__content">
				<div className="Build-card__commit">
					<BuildTitle number={id} color={statusColor} commitMessage={content.commit.message} />
					<CommitInfo
						branch={content.commit.branch}
						hash={content.commit.hash}
						author={content.commit.author}
						iconClass="Build-card__icon"
					/>
				</div>
				<BuildTime date={formattedDate} duration={formattedDuration} iconClass="Build-card__icon" />
			</div>
		</div>
	)
}

export default connect((state) => ({
	localization: state.localization,
}))(BuildCard)
