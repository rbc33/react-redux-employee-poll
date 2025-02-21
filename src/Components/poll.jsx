import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/poll";

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
    const handleSubmit = (option) => {
        dispatch(handleAnswerQuestion(question.id, option));
        props.router.navigate("/");
    };

    if (!question) {
        return <div>Question not found</div>;
    }

    const answered = users[authedUser]?.answers[question.id];

    return (
        <div className="center">
            <h3>Poll by {author}</h3>
            <img className="logIn-image" src={avatar} alt={`Avatar of ${author}`} />
            <div className="poll-options-grid">
                <div className={answered === "optionOne" ? "poll-option-ans" : "poll-option"}>
                    <p>{question.optionOne.text}</p>
                    <button
                        onClick={() => handleSubmit("optionOne")}
                        className="poll-btn"
                        disabled={answered}
                    >
                        Submit
                    </button>
                </div>
                <div className={answered === "optionTwo" ? "poll-option-ans" : "poll-option"}>
                    <p>{question.optionTwo.text}</p>
                    <button
                        onClick={() => handleSubmit("optionTwo")}
                        className="poll-btn"
                        disabled={answered}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
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
