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
import PrivateRoute from "./Components/PrivateRoute";
import PropTypes from "prop-types";

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
					<Route path="/login" element={<LogIn />} />
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route
						path="/questions/:id"
						element={
							<PrivateRoute>
								<Poll />
							</PrivateRoute>
						}
					/>
					<Route
						path="/new"
						element={
							<PrivateRoute>
								<NewPoll />
							</PrivateRoute>
						}
					/>
					<Route
						path="/leaderboard"
						element={
							<PrivateRoute>
								<LeaderBoard />
							</PrivateRoute>
						}
					/>
				</Routes>
			</div>
		</>
	);
};
App.propTypes = {
	loading: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = ({ authedUser }) => ({
	loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
