import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [wilders, setWilders] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [activeNavIcon, setActiveNavIcon] = useState(0);
  const tabs = ["Wilders", "Chats"];
  const navIcons = ["home_icon.svg", "profile_icon.svg"];
  const chats = [];

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
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`TabContainer ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              <h3 className="Tab">{tab}</h3>
            </button>
          ))}
        </section>
        <div className="WildersWrapper">
          {activeTab === 0 &&
            wilders
              .filter((wilder) =>
                wilder.username
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
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
          {activeTab === 1 &&
            chats
              .filter((chat) =>
                chat.username.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((chat) => (
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
                      <h2 className="WilderName">{chat.username}</h2>
                    </div>
                    <div className="WilderBioContainer">
                      <h3 className="WilderBio">{chat.bio}</h3>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </section>
      <nav className="Navbar">
        {navIcons.map((icon, index) => (
          <button
            type="button"
            className="Icon"
            key={icon}
            onClick={() => setActiveNavIcon(index)}
          >
            <img
              className="Vector"
              src={`${import.meta.env.VITE_BACKEND_URL}/assets/icons/${
                index === activeNavIcon ? icon.replace(".svg", "_1.svg") : icon
              }`}
              alt="icon"
            />
          </button>
        ))}
      </nav>
    </section>
  );
}

export default Home;
