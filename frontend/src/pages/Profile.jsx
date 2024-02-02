import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout(navigate);
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${user && user.id}`
      );
      logout(navigate);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="UserProfile">
      <div className="Header">
        <button type="button" className="Icon" onClick={() => navigate(-1)}>
          <img
            className="Vector"
            src={`${
              import.meta.env.VITE_BACKEND_URL
            }/assets/icons/chevron-left-solid.svg`}
            alt="icon"
          />
        </button>
      </div>
      <div className="ProfileWrapper">
        <div className="ProfileContainer">
          <div className="AvatarContainer">
            <img
              className="Avatar"
              src={`${
                import.meta.env.VITE_BACKEND_URL
              }/assets/images/89375707.png`}
              alt="Avatar"
            />
          </div>
          <div className="UsernameContainer">
            <h1 className="Username">{user && user.username}</h1>
          </div>
          <div className="EmailContainer">
            <h2 className="Email">{user && user.email}</h2>
          </div>
          <div className="TabsWrapper">
            <Link to="/editor" className="TabContainer">
              <div className="Icon">
                <img
                  className="Vector"
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/assets/icons/pen-to-square-regular.svg`}
                  alt="icon"
                />
              </div>
              <h2 className="Tab">Edit profile</h2>
            </Link>
          </div>
        </div>
      </div>
      <div className="OptionsWrapper">
        <div className="OptionContainer">
          <button type="button" className="Option" onClick={handleLogout}>
            <div className="OptionContentContainer">
              <div className="Icon">
                <img
                  className="Vector"
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/assets/icons/arrow-right-from-bracket-solid.svg`}
                  alt="icon"
                />
              </div>
              <h1 className="OptionContent">Log out</h1>
            </div>
            <div className="Icon">
              <img
                className="Vector"
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/assets/icons/chevron-right-solid.svg`}
                alt="icon"
              />
            </div>
          </button>
        </div>
        <div className="OptionContainer">
          <button
            type="button"
            className="Option"
            onClick={handleDeleteAccount}
          >
            <div className="OptionContentContainer">
              <div className="Icon">
                <img
                  className="Vector"
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/assets/icons/trash-solid.svg`}
                  alt="icon"
                />
              </div>
              <h1 className="OptionContent">Delete account</h1>
            </div>
            <div className="Icon">
              <img
                className="Vector"
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/assets/icons/chevron-right-solid.svg`}
                alt="icon"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
