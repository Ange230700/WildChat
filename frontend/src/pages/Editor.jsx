import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import Navbar from "../components/Navbar";

function Editor() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const { user, fetchUser } = useUser();
  const [formDetails, setFormDetails] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const location = useLocation();
  const [emailError, setEmailError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSignupClick = () => {
    setIsLogin(false);
  };

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      setEmailError("");
    }

    if (e.target.name) {
      setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    }
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
        key !== "password"
      ) {
        updatedUser.append(key, formDetails[key]);
      }
    });

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${user.id}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
                  value={formDetails?.username || ""}
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
                  value={formDetails?.email || ""}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  required
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
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  value={currentPassword || ""}
                  placeholder="New Password"
                  required
                />
                {formDetails.password && formDetails.password.length < 8 && (
                  <p>Password must be at least 8 characters long</p>
                )}
              </div>
              <div className="field">
                <input
                  type="password"
                  name="new_password"
                  className={
                    newPassword && newPassword.length < 8 ? "errorPassword" : ""
                  }
                  minLength="8"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword || ""}
                  placeholder="New Password"
                  required
                />
                {formDetails.password && formDetails.password.length < 8 && (
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
                  value={confirmNewPassword || ""}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
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
