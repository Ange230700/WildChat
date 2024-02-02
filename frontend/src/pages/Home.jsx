import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Home() {
  const [wilders, setWilders] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Wilders", "Chats"];
  // const chats = [];

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
                <div className="WilderContainer" key={wilder.id}>
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
                  </div>
                </div>
              ))}
          {activeTab === 1 && null}
        </div>
      </section>
      <Navbar />
    </section>
  );
}

export default Home;
