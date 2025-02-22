import { useState } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";

const LogIn = ({ users, dispatch }) => {
	const [selectedUser, setSelectedUser] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedUser) {
			dispatch(setAuthedUser(selectedUser));
			navigate(location.pathname ? location.pathname : "/", {
				replace: true,
			});
		}
	};

	return (
		<div className="center" data-testid="login-component">
			<h1>Employee Polls</h1>
			<img
				className="logIn-image"
				src="https://i.blogs.es/f32438/1366_2000-5-/1024_2000.jpeg"
			/>
			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				<select
					className="selector"
					value={selectedUser}
					onChange={(e) => setSelectedUser(e.target.value)}
				>
					<option value="">Select a user</option>
					{Object.values(users).map((user) => (
						<option key={user.id} value={user.id}>
							{user.name}
						</option>
					))}
				</select>
				<br />
				<button className="btn" type="submit" disabled={!selectedUser}>
					Log In
				</button>
			</form>
		</div>
	);
};

LogIn.propTypes = {
	users: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
	redirectPath: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	users: state.users,
	redirectPath: ownProps.redirectPath,
});

export default connect(mapStateToProps)(LogIn);
