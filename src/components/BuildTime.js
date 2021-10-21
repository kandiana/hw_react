import { ReactComponent as CalendarIcon } from '../imgs/calendar-icon.svg'
import { ReactComponent as ClockIcon } from '../imgs/clock-icon.svg'

import './BuildTime.css'

function BuildTime({ date, duration, iconClass }) {
	return (
		<div className="Build-time">
			<div className="Build-time__content">
				<CalendarIcon className={iconClass} />
				<span>{date}</span>
			</div>
			<div className="Build-time__content">
				<ClockIcon className={iconClass} />
				<span>{duration}</span>
			</div>
		</div>
	)
}

export default BuildTime
