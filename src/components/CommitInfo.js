import { ReactComponent as BranchIcon } from '../imgs/branch-icon.svg'
import { ReactComponent as UserIcon } from '../imgs/user-icon.svg'

import './CommitInfo.css'

function CommitInfo(props) {
	return (
		<div className="Commit-info">
			<div className="Commit-info__line">
				<BranchIcon className={props.iconClass} />
				<span className="Commit-info__branch">{props.branch}</span>
				<span className="Commit-info__hash">{props.hash}</span>
			</div>
			<div className="Commit-info__line">
				<UserIcon className={props.iconClass} />
				<span className="Commit-info__author">{props.author}</span>
			</div>
		</div>
	)
}

export default CommitInfo
