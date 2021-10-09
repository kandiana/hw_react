import { format, formatDuration } from 'date-fns'

import { ReactComponent as OkIcon } from '../imgs/build-icon_ok.svg'
import { ReactComponent as ErrorIcon } from '../imgs/build-icon_error.svg'
import { ReactComponent as TimeoutIcon } from '../imgs/build-icon_timeout.svg'

import BuildTitle from './BuildTitle'
import CommitInfo from './CommitInfo'
import BuildTime from './BuildTime'

import './BuildCard.css'

function BuildCard(props) {
	//setting icon shape and color depending on build status
	const statusColor = `var(--color-${props.status})`
	const iconElement = () => {
		switch (props.status) {
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
	const formattedDate = format(props.content.date, 'dd MMM, HH:mm')
	const formattedDuration = formatDuration(props.content.duration, { format: ['hours', 'minutes'] })
		.replace('hour', 'h')
		.replace('minutes', 'min')

	return (
		<div className="Build-card">
			{iconElement()}
			<div className="Build-card__content">
				<div className="Build-card__commit">
					<BuildTitle number={props.id} color={statusColor} commitMessage={props.content.commit.message} />
					<CommitInfo
						branch={props.content.commit.branch}
						hash={props.content.commit.hash}
						author={props.content.commit.author}
						iconClass="Build-card__icon"
					/>
				</div>
				<BuildTime date={formattedDate} duration={formattedDuration} iconClass="Build-card__icon" />
			</div>
		</div>
	)
}

export default BuildCard
