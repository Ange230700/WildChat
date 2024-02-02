import { createContext, useContext, useState, useMemo, useEffect } from "react";
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

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        if (isTokenExpired(token)) {
          logout();
          return;
        }
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserInContext = (updatedUser) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const contextValue = useMemo(() => {
    return { user, setUser, fetchUser, logout, updateUserInContext };
  }, [user, setUser, fetchUser, logout, updateUserInContext]);

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
