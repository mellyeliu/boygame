import React from "react";

const Homepage = () => {
  const containerStyle = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#101010",
  };

  const imageWrapperStyle = {
    position: "relative",
    width: "fit-content",
    height: "100vh",
    margin: "0 auto",
  };

  const imageStyle = {
    height: "100vh",
    width: "auto",
  };

  const buttonStyle = {
    position: "absolute",
    top: "76%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "2vh 4vh",
    backgroundColor: "#FFA6CB",
    color: "black",
    border: "none",
    fontSize: "2.7vh",
    borderRadius: "1.5vh",
    fontFamily: "Syne Mono, sans-serif",
    boxShadow: "white -7px 7px 6px inset, #A8466F 7px -7px 6px inset",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={imageWrapperStyle}>
        <img src="/img/home.png" alt="Title Screen" style={imageStyle} />
        <button style={buttonStyle}>START</button>
      </div>
    </div>
  );
};

export default Homepage;
