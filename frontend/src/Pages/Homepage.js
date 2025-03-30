import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const createGame = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/game/create", {
        method: "POST",
      });
      const game = await res.json();
      if (res.ok && game.code) {
        navigate(`/waiting/${game.code}`);
      } else {
        console.error("failed to create game:", game);
      }
    } catch (err) {
      console.error("error creating game:", err);
    }
  };

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
    top: "73%",
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
    transition: "transform 0.2s ease",
  };

  return (
    <div style={containerStyle}>
      <div style={imageWrapperStyle}>
        <img src="/img/home.png" alt="Title Screen" style={imageStyle} />
        <button
          style={buttonStyle}
          onClick={createGame}
          onMouseEnter={(e) => (e.target.style.transform = "translate(-50%, -50%) scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "translate(-50%, -50%)")}
        >
          START
        </button>
      </div>
    </div>
  );
};

export default Homepage;
