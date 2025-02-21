import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

const Nav = ({ userName, avatar, authedUser, dispatch }) => {
	const navigate = useNavigate();
	if (!authedUser) navigate("/");
	const handleOnClick = () => {
		dispatch(setAuthedUser(null));
	};

	return (
		<nav className="nav">
			<ul>
				<div className="nav-links">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/new">New Poll</Link>
					</li>
					<li>
						<Link to="/leaderboard">Leaderboard</Link>
					</li>
				</div>
				<li className="user-info">
					<img src={avatar} alt={`Avatar of ${userName}`} className="avatar" />
					<div className="user-details">
						<span>{userName}</span>
						<button onClick={handleOnClick} className="logout-btn">
							Log out
						</button>
					</div>
				</li>
			</ul>
		</nav>
	);
};

Nav.propTypes = {
	userName: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	authedUser: PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authedUser, users, dispatch }) => {
	const user = users[authedUser];
	return {
		authedUser,
		userName: user ? user.name : null,
		avatar: user ? user.avatarURL : null,
		dispatch,
	};
};

export default connect(mapStateToProps)(Nav);
