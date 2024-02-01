function Profile() {
  return (
    <div className="UserProfile">
      <div className="Header">
        <div className="Icon" style={{ width: 16, height: 27 }}>
          <img
            className="Vector"
            src={`${
              import.meta.env.VITE_BACKEND_URL
            }/assets/icons/chevron-left-solid.svg`}
            alt="icon"
          />
        </div>
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
            <h1 className="Username">Claire BOUCHER</h1>
          </div>
          <div className="EmailContainer">
            <h2 className="Email">aczdf@zed.de</h2>
          </div>
          <div className="TabsWrapper">
            <div className="TabContainer">
              <div className="Icon">
                <img
                  className="Vector"
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/assets/icons/pen-to-square-regular.svg`}
                  alt="icon"
                />
              </div>
              <h2 className="Tab">Edit avatar</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="OptionsWrapper">
        <div className="OptionContainer">
          <div className="Option">
            <div className="OptionContentContainer">
              <div
                className="TrashSolid1"
                style={{
                  width: 24,
                  height: 28,
                }}
              >
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
