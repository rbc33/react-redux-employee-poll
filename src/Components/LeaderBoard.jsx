import React from "react";
import { connect } from "react-redux";

const LeaderBoard = ({ users }) => {
	return (
		<>
			<table>
				<tr>
					<td>Users</td>
					<td>Answered</td>
					<td>Created</td>
				</tr>
				{users.map((user) => (
					<tr key={user.id}>
						<td className="user-cell">
							<img
								src={user.avatarURL}
								alt={`Avatar of ${user.name}`}
								className="avatar"
							/>
							<div className="leaderboard-user-info">
								<span className="leaderboard-user-name">{user.name}</span>
								<span className="leaderboard-user-id">@{user.id}</span>
							</div>
						</td>
						<td>{Object.keys(user.answers).length}</td>
						<td>{user.questions.length}</td>
					</tr>
				))}
			</table>
		</>
	);
};
const mapStateToProps = ({ users }) => {
	return {
		users: Object.values(users).sort(
			(a, b) =>
				b.questions.length +
				Object.keys(b.answers).length -
				(a.questions.length + Object.keys(a.answers).length)
		),
	};
};
export default connect(mapStateToProps)(LeaderBoard);
