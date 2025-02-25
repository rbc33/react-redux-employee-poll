import { _getUsers, _getQuestions } from "../utils/api/_DATA";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./poll";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function handleInitialData() {
	return (dispatch) => {
		dispatch(showLoading());
		return Promise.all([_getUsers(), _getQuestions()]).then(
			([users, questions]) => {
				dispatch(receiveUsers(users));
				dispatch(receiveQuestions(questions));
				dispatch(hideLoading());
			}
		);
	};
}
