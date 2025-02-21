import { formatDate } from "../utils/api/_DATA";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

const PollItem = ({ author, timestamp, id }) => {
	const navigate = useNavigate();
	return (
		<div className="poll-info">
			<div>
				<span>{author}</span>
				<div>{formatDate(timestamp)}</div>
				<button
					className="poll-btn"
					onClick={() => navigate(`/questions/${id}`)}
				>
					Show
				</button>
			</div>
		</div>
	);
};
PollItem.propTypes = {
	author: PropTypes.string.isRequired,
	timestamp: PropTypes.number.isRequired,
	id: PropTypes.string.isRequired,
};

export default PollItem;
