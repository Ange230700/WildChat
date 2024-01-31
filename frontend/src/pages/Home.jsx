import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [wilders, setWilders] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
      .then((response) => {
        setWilders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="Home">
      <header className="Header">
        <div className="LogoContainer">
          <h1 className="Logo">WC</h1>
        </div>
      </header>
      <section className="HomeWrapper">
        <div className="SearchBarContainer">
          <input
            type="search"
            placeholder="Search"
            className="SearchBarInput"
            value={searchValue || ""}
            onChange={handleSearchChange}
          />
        </div>
        <section className="TabsWrapper">
          <div className="TabContainer">
            <h3 className="Tab">Wilders</h3>
          </div>
          <div className="TabContainer">
            <h3 className="Tab">Chats</h3>
          </div>
        </section>
        <div className="WildersWrapper">
          {wilders
            .filter((wilder) =>
              wilder.username.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((wilder) => (
              <div className="WilderContainer">
                <div className="AvatarContainer">
                  <img
                    className="Avatar"
                    src={`${
                      import.meta.env.VITE_BACKEND_URL
                    }/assets/images/89375707.png`}
                    alt="Avatar"
                  />
                </div>
                <div className="WilderInfo">
                  <div className="WilderNameContainer">
                    <h2 className="WilderName">{wilder.username}</h2>
                  </div>
                  <div className="WilderBioContainer">
                    <h3 className="WilderBio">{wilder.bio}</h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <nav className="Navbar">
          <div className="Icon">
            <img
              className="Vector"
              src={`${
                import.meta.env.VITE_BACKEND_URL
              }/assets/icons/home_icon.svg`}
              alt="icon"
            />
          </div>
          <div className="Icon">
            <img
              className="Vector"
              src={`${
                import.meta.env.VITE_BACKEND_URL
              }/assets/icons/profile_icon.svg`}
              alt="icon"
            />
          </div>
        </nav>
      </section>
    </section>
  );
}

export default Home;
