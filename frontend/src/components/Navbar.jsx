import { useNavigate } from "react-router-dom";

function Navbar() {
  const navIcons = ["house-solid_1.svg", "user-solid_1.svg"];
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
            src={`${import.meta.env.VITE_BACKEND_URL}/assets/icons/${icon}`}
            alt="icon"
          />
        </button>
      ))}
    </nav>
  );
}

export default Navbar;
