import { createContext, useContext, useState, useMemo } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import isTokenExpired from "../utils/utils";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem("token");
    if (navigate) {
      navigate("/");
    }
  };

  const fetchUser = () => {
    const token = localStorage.getItem("token");

    if (token) {
      if (isTokenExpired(token)) {
        logout();
        return;
      }

      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const contextValue = useMemo(() => {
    return { user, setUser, fetchUser, logout };
  }, [user, setUser, fetchUser, logout]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
