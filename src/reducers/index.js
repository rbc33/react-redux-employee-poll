import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import { loadingBarReducer } from "react-redux-loading-bar";
import questions from "./poll";

export default combineReducers({
	authedUser,
	users,
	questions,
	loadingBar: loadingBarReducer,
});
