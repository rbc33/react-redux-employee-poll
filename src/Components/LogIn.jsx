import { useState } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogIn = ({ users, dispatch }) => {
	const [selectedUser, setSelectedUser] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedUser) {
			dispatch(setAuthedUser(selectedUser));
			navigate("/");
		}
	};

	return (
		<div className="center">
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
const mapStateToProps = (state) => ({
	users: state.users,
	dispatch: state.dispatch,
});

export default connect(mapStateToProps)(LogIn);
