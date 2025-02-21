import { handleAddQuestion } from "../actions/poll";
import { useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

const NewPoll = ({ dispatch }) => {
	const [optionOne, setOptionOne] = useState("");
	const [optionTwo, setOptionTwo] = useState("");
	const navigate = useNavigate();

	const handleChangeOne = (e) => {
		e.preventDefault();
		setOptionOne(e.target.value);
	};
	const handleChangeTwo = (e) => {
		e.preventDefault();
		setOptionTwo(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(handleAddQuestion(optionOne, optionTwo));
		navigate("/");
	};
	return (
		<div className="poll-info">
			<h1>Would You Rather</h1>
			<span>Create Your Own Poll</span>
			<form>
				<input
					className="textarea"
					onChange={handleChangeOne}
					type="text"
					value={optionOne}
					placeholder="Option One"
				/>
				<br />
				<input
					className="textarea"
					onChange={handleChangeTwo}
					type="text"
					value={optionTwo}
					placeholder="Option Two"
				/>
				<br />
				<button onClick={handleSubmit} className="poll-btn">
					Submit
				</button>
			</form>
		</div>
	);
};

NewPoll.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ dispatch }) => {
	return {
		dispatch,
	};
};
export default connect(mapStateToProps)(NewPoll);
