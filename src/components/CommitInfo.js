import { ReactComponent as BranchIcon } from '../imgs/branch-icon.svg'
import { ReactComponent as UserIcon } from '../imgs/user-icon.svg'

import './CommitInfo.css'

function CommitInfo({ iconClass, branch, hash, author }) {
	return (
		<div className="Commit-info">
			<div className="Commit-info__line">
				<BranchIcon className={iconClass} />
				<span className="Commit-info__branch">{branch}</span>
				<span className="Commit-info__hash">{hash}</span>
			</div>
			<div className="Commit-info__line">
				<UserIcon className={iconClass} />
				<span className="Commit-info__author">{author}</span>
			</div>
		</div>
	)
}

export default CommitInfo
