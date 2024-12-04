import React, { useMemo } from "react";
import "../animations.css";

const Player = ({ image, name, isActive }) => {
  const animationDuration = useMemo(() => Math.random() * 10 + 20, []); // Duration between 3s and 5s
  const animationDelay = useMemo(() => Math.random() * 5, []); // Delay between 0s and 2s

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "5vh",
      animation: `drift ${animationDuration}s ease-in-out ${animationDelay}s infinite`, // Drifting with rotation
      transition: "filter 0.3s ease, opacity 0.3s ease",
      margin: "0px 25px",
      marginBottom: "50px",
    },
    image: {
      aspectRatio: "1 / 1",
      maxWidth: "9vh",
      maxHeight: "9vh",
      minWidth: "80px",
      minHeight: "80px",
      borderRadius: "50%",
      objectFit: "cover",
      filter: isActive ? "none" : "grayscale(100%)",
      opacity: isActive ? 1 : 0.5,
    },
    name: {
      marginTop: "10px",
      fontSize: "clamp(1rem, 1.3vh, 20rem)",
      fontWeight: "bold",
      textAlign: "center",
      color: isActive ? "white" : "#333",
    },
  };

  return (
    <div style={styles.container}>
      <img src={image} alt={name} style={styles.image} />
      <div style={styles.name}>{name}</div>
    </div>
  );
};

export default Player;
