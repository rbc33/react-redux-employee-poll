import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PollItem from "./PollItem";

const Dashboard = ({ questions, authedUser, users }) => {
	const [newPolls, setNewPolls] = useState([]);
	const [donePolls, setDonePolls] = useState([]);

	useEffect(() => {
		const userAnswers = Object.keys(users[authedUser].answers);
		const allQuestions = Object.values(questions);

		const done = allQuestions.filter((question) =>
			userAnswers.includes(question.id)
		);

		const notDone = allQuestions.filter(
			(question) => !userAnswers.includes(question.id)
		);

		setDonePolls(done);
		setNewPolls(notDone);
	}, [questions, authedUser, users]);

	return (
		<div className="dashboard-container">
			<div className="polls-section">
				<h2 className="center">New Polls</h2>
				<div className="polls-grid">
					{newPolls.map((question) => (
						<PollItem
							key={question.id}
							id={question.id}
							author={question.author}
							timestamp={question.timestamp}
						/>
					))}
				</div>
			</div>
			<div className="polls-section">
				<h2 className="center">Done </h2>
				<div className="polls-grid">
					{donePolls.map((question) => (
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

const mapStateToProps = (state) => ({
	authedUser: state.authedUser,
	questions: state.questions,
	users: state.users,
});

export default connect(mapStateToProps)(Dashboard);
