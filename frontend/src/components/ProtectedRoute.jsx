import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useUser } from "../contexts/UserContext";
import isTokenExpired from "../utils/utils";

function ProtectedRoute({ children }) {
  const { fetchUser, logout } = useUser();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    logout(navigate);
  };

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      handleLogout();
    }

    fetchUser();
  }, [token, isTokenExpired(token)]);

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
