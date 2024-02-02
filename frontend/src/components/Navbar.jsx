import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Navbar() {
  const navIcons = ["house-solid_1.svg", "user-solid_1.svg"];
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useUser();

  return (
    <nav className="Navbar">
      {navIcons.map((icon, index) => (
        <button
          type="button"
          className="Icon"
          key={icon}
          onClick={() => {
            if (index === 0) {
              navigate("/home");
            } else if (index === 1) {
              if (token) {
                navigate("/profile");
              } else {
                navigate("/");
              }
            }
          }}
        >
          <img
            className="Vector"
            src={
              `${import.meta.env.VITE_BACKEND_URL}/assets/icons/${icon}` ||
              (index &&
                user &&
                `${
                  import.meta.env.VITE_BACKEND_URL
                }/assets/images/89375707.png`)
            }
            alt="icon"
          />
        </button>
      ))}
    </nav>
  );
}

export default Navbar;
