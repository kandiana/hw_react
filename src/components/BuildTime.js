import { ReactComponent as CalendarIcon } from '../imgs/calendar-icon.svg'
import { ReactComponent as ClockIcon } from '../imgs/clock-icon.svg'

import './BuildTime.css'

function BuildTime(props) {
	return (
		<div className="Build-time">
			<div className="Build-time__content">
				<CalendarIcon className={props.iconClass} />
				<span>{props.date}</span>
			</div>
			<div className="Build-time__content">
				<ClockIcon className={props.iconClass} />
				<span>{props.duration}</span>
			</div>
		</div>
	)
}

export default BuildTime
