import { useNavigate } from "react-router-dom";
import axios from "axios";
import App from "./App";
import isTokenExpired from "./utils/utils";

function AppWrapper() {
  const navigate = useNavigate();

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response &&
        error.response.status === 401 &&
        isTokenExpired(localStorage.getItem("token"))
      ) {
        localStorage.removeItem("token");
        navigate("/ ");
      }
      return Promise.reject(error);
    }
  );

  return <App />;
}

export default AppWrapper;
