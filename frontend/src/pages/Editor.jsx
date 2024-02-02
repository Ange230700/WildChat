import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import Navbar from "../components/Navbar";

function Editor() {
  const { user, fetchUser } = useUser();
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formDetails, setFormDetails] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });
  const location = useLocation();
  const [emailError, setEmailError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSignupClick = () => {
    setIsLogin(false);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;

    if (name === "email") {
      if (!emailRegex.test(value)) {
        setEmailError("Email is not valid");
      } else {
        setEmailError("");
      }
    }

    if (name === "current_password") {
      setCurrentPassword(e.target.value);
    }

    if (name === "new_password") {
      setNewPassword(e.target.value);
    }

    if (name === "confirm_password") {
      setConfirmNewPassword(e.target.value);
    }

    setFormDetails({ ...formDetails, [name]: value });
  };

  const formStyle = { marginLeft: "0%" };
  const textStyle = { marginLeft: "0%" };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = new FormData();

    Object.keys(formDetails).forEach((key) => {
      if (
        formDetails[key] &&
        formDetails[key] !== user[key] &&
        key !== "confirm_password"
      ) {
        updatedUser.append(key, formDetails[key]);
      }
    });

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${user.id}`,
        {
          ...formDetails,
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        fetchUser();
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      setFormDetails({
        username: user?.username,
        email: user?.email,
      });
    } else {
      navigate("/");
    }
  }, [user]);

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
          <h1 className="title signup">Edit Form</h1>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" id="signup" checked={isLogin} />
            <button
              // htmlFor="signup"
              type="button"
              className="slide signup"
              onClick={handleSignupClick}
            >
              Editor
            </button>
            <div className="slider-tab" />
          </div>
          <div className="form-inner" style={formStyle}>
            <form className="signup" onSubmit={handleSignupSubmit}>
              <div className="field">
                <input
                  type="text"
                  name="username"
                  value={formDetails?.username}
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
                    (formDetails?.email || user?.email) &&
                    !emailRegex.test(formDetails?.email)
                      ? "errorEmail"
                      : ""
                  }
                  value={formDetails?.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                />
                {emailError && <p>{emailError && emailError}</p>}
              </div>
              <div className="field">
                <input
                  type="password"
                  name="current_password"
                  className={
                    currentPassword && currentPassword.length < 8
                      ? "errorPassword"
                      : ""
                  }
                  minLength="8"
                  onChange={handleInputChange}
                  value={currentPassword}
                  placeholder="Current Password"
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  name="new_password"
                  className={
                    newPassword && newPassword.length < 8 ? "errorPassword" : ""
                  }
                  minLength="8"
                  onChange={handleInputChange}
                  value={newPassword}
                  placeholder="New Password"
                  required
                />
                {newPassword && newPassword.length < 8 && (
                  <p>Password must be at least 8 characters long</p>
                )}
              </div>
              <div className="field">
                <input
                  type="password"
                  name="confirm_password"
                  className={
                    confirmNewPassword && confirmNewPassword !== newPassword
                      ? "errorPassword"
                      : ""
                  }
                  placeholder="Confirm password"
                  value={confirmNewPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="field btn">
                <div className="btn-layer" />
                <input type="submit" value="Edit" />
              </div>
            </form>
          </div>
        </div>
      </section>
      <Navbar />
    </>
  );
}

export default Editor;
