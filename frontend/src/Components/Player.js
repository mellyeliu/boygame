import React, { useMemo } from "react";
import "../animations.css";

const Player = ({ image, name, isActive, motion = true, large = false }) => {
  const animationDuration = useMemo(() => Math.random() * 10 + 20, []); // Duration between 3s and 5s
  const animationDelay = useMemo(() => Math.random() * 5, []); // Delay between 0s and 2s

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: large ? "6.5vh" : "5vh", // 1.3x bigger when large
      animation: motion
        ? `drift ${animationDuration}s ease-in-out ${animationDelay}s infinite`
        : "none", // Drifting with rotation
      transition: "filter 0.3s ease, opacity 0.3s ease",
      margin: "0px 25px",
      marginBottom: "10px",
    },
    image: {
      aspectRatio: "1 / 1",
      maxWidth: large ? "11.7vh" : "9vh", // 1.3x bigger when large
      maxHeight: large ? "11.7vh" : "9vh", // 1.3x bigger when large
      minWidth: large ? "104px" : "80px", // 1.3x bigger when large
      minHeight: large ? "104px" : "80px", // 1.3x bigger when large
      borderRadius: "50%",
      objectFit: "cover",
      filter: isActive ? "none" : "grayscale(100%)",
      opacity: isActive ? 1 : 0.5,
    },
    name: {
      marginTop: "10px",
      fontSize: "clamp(0.8rem, 1.2vh, 20rem)",
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: "Syne Mono, sans-serif",
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
