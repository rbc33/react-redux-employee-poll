import { Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, authedUser }) => {
	const location = useLocation();

	if (!authedUser) {
		// Store the attempted location
		localStorage.setItem("redirectUrl", location.pathname);
		return <Navigate to="/login" replace />;
	}

	return children;
};

PrivateRoute.propTypes = {
	authedUser: PropTypes.string,
	children: PropTypes.node,
};

const mapStateToProps = ({ authedUser }) => ({
	authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);
