import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PollItem from "./PollItem";
import { PropTypes } from "prop-types";

const Dashboard = ({ questions, authedUser, users }) => {
	const [notDone, setNotDone] = useState([]);
	const [done, setDone] = useState([]);
	const [toggleView, setToggleView] = useState(true);

	useEffect(() => {
		const userAnswers = Object.keys(users[authedUser].answers);
		const allQuestions = Object.values(questions).sort(
			(a, b) => b.timestamp - a.timestamp
		);

		const done = allQuestions.filter((question) =>
			userAnswers.includes(question.id)
		);
		setDone(done);
		const notDone = allQuestions.filter(
			(question) => !userAnswers.includes(question.id)
		);
		setNotDone(notDone);
	}, [questions, authedUser, users]);

	const handleToggle = () => {
		setToggleView(!toggleView);
	};
	return (
		<div className="dashboard-container">
			<div className="polls-section">
				<button className="poll-btn" onClick={handleToggle}>
					Toggle Done/View
				</button>
				<h2 className="center">{!toggleView ? "New Polls" : "Done"}</h2>
				<div className="polls-grid">
					{toggleView
						? notDone.map((question) => (
								<PollItem
									key={question.id}
									id={question.id}
									author={question.author}
									timestamp={question.timestamp}
								/>
						  ))
						: done.map((question) => (
								<PollItem
									key={question.id}
									id={question.id}
									author={question.author}
									timestamp={question.timestamp}
								/>
						  ))}
				</div>
			</div>
		</div>
	);
};

Dashboard.propTypes = {
	authedUser: PropTypes.string.isRequired,
	questions: PropTypes.object.isRequired,
	users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	authedUser: state.authedUser,
	questions: state.questions,
	users: state.users,
});

export default connect(mapStateToProps)(Dashboard);
