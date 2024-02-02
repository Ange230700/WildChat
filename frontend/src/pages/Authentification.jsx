import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import Navbar from "../components/Navbar";

function Authentification() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { setUser } = useUser();
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const [emailError, setEmailError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleSignupClick = () => {
    setIsLogin(false);
  };

  const handleRadioChange = (e) => {
    if (e.target.id === "login") {
      setIsLogin(true);
    } else if (e.target.id === "signup") {
      setIsLogin(false);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      setEmailError("");
    }

    if (e.target.name) {
      setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    }
  };

  const formStyle = isLogin ? { marginLeft: "0%" } : { marginLeft: "-100%" };
  const textStyle = isLogin ? { marginLeft: "0%" } : { marginLeft: "-100%" };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (formDetails.password !== confirmPassword) {
      console.info("Passwords do not match");
      return;
    }

    if (!emailRegex.test(formDetails.email)) {
      console.info("Invalid email");
      return;
    }

    if (!formDetails.username || !formDetails.email || !formDetails.password) {
      console.info("Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        formDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.info("Account created successfully");
        setIsLogin(true);
      } else {
        console.error("Failed to create account");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          email: formDetails.email,
          password: formDetails.password,
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        setUser(user);
        console.info("Logged in successfully");
        navigate("/home");
      } else if (response.status === 422) {
        console.error("Invalid email or password");
      } else {
        console.error("Failed to login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section
        className="wrapper"
        style={
          location.pathname.includes("authentification")
            ? {
                position: "relative",
              }
            : {}
        }
      >
        <div className="title-text" style={textStyle}>
          <h1 className="title login">Login Form</h1>
          <h1 className="title signup">Signup Form</h1>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLogin}
              onChange={handleRadioChange}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLogin}
              onChange={handleRadioChange}
            />
            <button
              // htmlFor="login"
              type="button"
              className="slide login"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              // htmlFor="signup"
              type="button"
              className="slide signup"
              onClick={handleSignupClick}
            >
              Signup
            </button>
            <div className="slider-tab" />
          </div>
          <div className="form-inner" style={formStyle}>
            <form
              className="login"
              onSubmit={(e) => {
                handleLoginSubmit(e);
              }}
            >
              <div className="field">
                <input type="email" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
              </div>
              {/* <div className="pass-link">
              <Link to="/">Forgot password?</Link>
            </div> */}
              <div className="field btn">
                <div className="btn-layer" />
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                Not a member? <span>Signup now</span>
              </div>
            </form>
            <form className="signup" onSubmit={handleSignupSubmit}>
              <div className="field">
                <input
                  type="text"
                  name="username"
                  value={formDetails.username || ""}
                  onChange={handleInputChange}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="field">
                <input
                  type="email"
                  name="email"
                  className={
                    formDetails.email && !emailRegex.test(formDetails.email)
                      ? "errorEmail"
                      : ""
                  }
                  value={formDetails.email || ""}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  required
                />
                {emailError && <p>{emailError && emailError}</p>}
              </div>
              <div className="field">
                <input
                  type="password"
                  name="password"
                  className={
                    formDetails.password && formDetails.password.length < 8
                      ? "errorPassword"
                      : ""
                  }
                  minLength="8"
                  onChange={handleInputChange}
                  value={formDetails.password || ""}
                  placeholder="Password"
                  required
                />
                {formDetails.password && formDetails.password.length < 8 && (
                  <p>Password must be at least 8 characters long</p>
                )}
              </div>
              <div className="field">
                <input
                  type="password"
                  className={
                    confirmPassword && confirmPassword !== formDetails.password
                      ? "errorPassword"
                      : ""
                  }
                  placeholder="Confirm password"
                  value={confirmPassword || ""}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="field btn">
                <div className="btn-layer" />
                <input type="submit" value="Signup" />
              </div>
            </form>
          </div>
        </div>
      </section>
      <Navbar />
    </>
  );
}

export default Authentification;
