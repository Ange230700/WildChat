import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "./contexts/UserContext";

function App() {
  const location = useLocation();
  const { fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div
      className="App"
      style={
        location.pathname.includes("/")
          ? {
              justifyContent: "center",
            }
          : {}
      }
    >
      <Outlet />
    </div>
  );
}

export default App;
