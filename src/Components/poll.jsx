import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/poll";
import { PropTypes } from "prop-types";

const withRouter = (Component) => {
	const ComponentWithRouterProp = (props) => {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return <Component {...props} router={{ location, navigate, params }} />;
	};
	return ComponentWithRouterProp;
};

const Poll = (props) => {
	const { question, author, avatar, dispatch, users, authedUser } = props;

	if (!question) {
		return <div>Question not found</div>;
	}

	const handleSubmit = (option) => {
		dispatch(handleAnswerQuestion(question.id, option));
		props.router.navigate("/"); // Navigate back to dashboard after voting
	};

	const answered = users[authedUser]?.answers[question.id];

	// Calculate percentages only if there are votes
	const totalVotes =
		(question.optionOne.votes?.length || 0) +
		(question.optionTwo.votes?.length || 0);
	const optionOnePercent =
		totalVotes === 0
			? 0
			: Math.round(
					((question.optionOne.votes?.length || 0) / totalVotes) * 100
			  );
	const optionTwoPercent = 100 - optionOnePercent; // Ensure percentages add up to 100

	return (
		<div className="center">
			<h3>Poll by {author}</h3>
			<img className="logIn-image" src={avatar} alt={`Avatar of ${author}`} />
			<div className="poll-options-grid">
				<div
					className={
						answered === "optionOne" ? "poll-option-ans" : "poll-option"
					}
				>
					<p>{question.optionOne.text}</p>
					<button
						onClick={() => handleSubmit("optionOne")}
						className="poll-btn"
						disabled={answered}
					>
						Submit
					</button>
					{answered && (
						<p>
							{optionOnePercent}% voted this option with{" "}
							{question.optionOne.votes?.length || 0} votes
						</p>
					)}
				</div>
				<div
					className={
						answered === "optionTwo" ? "poll-option-ans" : "poll-option"
					}
				>
					<p>{question.optionTwo.text}</p>
					<button
						onClick={() => handleSubmit("optionTwo")}
						className="poll-btn"
						disabled={answered}
					>
						Submit
					</button>
					{answered && (
						<p>
							{optionTwoPercent}% voted this option with{" "}
							{question.optionTwo.votes?.length || 0} votes
						</p>
					)}
				</div>
			</div>
		</div>
	);
};
Poll.propTypes = {
	question: PropTypes.object,
	author: PropTypes.string,
	avatar: PropTypes.string,
	dispatch: PropTypes.func,
	users: PropTypes.object,
	authedUser: PropTypes.string,
	router: PropTypes.object,
};
const mapStateToProps = ({ questions, users, authedUser }, props) => {
	const { id } = props.router.params;
	const question = questions[id];

	return {
		question,
		author: question ? users[question.author].name : null,
		avatar: question ? users[question.author].avatarURL : null,
		authedUser,
		users,
	};
};

export default withRouter(connect(mapStateToProps)(Poll));
