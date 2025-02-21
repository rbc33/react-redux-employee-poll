import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const LeaderBoard = ({ users }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Users</th>
                        <th>Answered</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>
        </div>
    );
};

LeaderBoard.propTypes = {
	users: PropTypes.array.isRequired,
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
