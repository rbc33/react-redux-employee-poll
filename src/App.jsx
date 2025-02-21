import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading-bar";
import Nav from "./Components/Nav";
import { Routes, Route } from "react-router-dom";
import LogIn from "./Components/LogIn";
import Dashboard from "./Components/dashboard";
import Poll from "./Components/Poll";
import NewPoll from "./Components/NewPoll";
import LeaderBoard from "./Components/LeaderBoard";

const App = (props) => {
	useEffect(() => {
		props.dispatch(handleInitialData());
	}, []);

	if (props.loading) {
		return (
			<div>
				<LoadingBar />
				<LogIn />
			</div>
		);
	}

	return (
		<>
			<LoadingBar />
			<div className="container">
				<Nav />
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/polls/:id" element={<Poll />} />
					<Route path="/new" element={<NewPoll />} />
					<Route path="/leaderboard" element={<LeaderBoard />} />
				</Routes>
			</div>
		</>
	);
};

const mapStateToProps = ({ authedUser }) => ({
	loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
