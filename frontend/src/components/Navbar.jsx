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
            className={`Vector ${index === 1 && token ? "avatar" : ""}`}
            src={
              token && index === 1
                ? `${
                    import.meta.env.VITE_BACKEND_URL
                  }/assets/images/89375707.png`
                : `${import.meta.env.VITE_BACKEND_URL}/assets/icons/${icon}`
            }
            alt="icon"
          />
        </button>
      ))}
    </nav>
  );
}

export default Navbar;
