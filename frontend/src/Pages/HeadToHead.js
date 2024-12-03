import React from "react";
import Character from "../Components/Character"; // Assuming you already have a Character component

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "black",
  },
  characterContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  middleContainer: {
    flex: 1,
    zIndex: 10,
    display: "flex",
    position: "absolute",
    top: "35%", // Place above the VS text
    left: "50%",
    transform: "translate(-50%, -50%)",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  timer: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: "17.5px",
    fontWeight: "400",
    fontFamily: "Syne Mono, sans-serif",
    color: "white",
  },
  subtitleBelow: {
    fontSize: "17.5px",
    fontWeight: "400",
    fontFamily: "Syne Mono, sans-serif",
    color: "white",
    marginTop: "-60px",
  },
  mainTitle: {
    fontSize: "30px",
    fontFamily: "Xanh Mono, sans-serif",
    color: "#fff",
    zIndex: 20,
    textAlign: "center",
    backgroundImage: "url('img/question.svg')", // Replace with actual image path
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    padding: "35px 16px 16px",
    height: "110px",
    borderRadius: "8px",
    width: "100%",
  },
  vsText: {
    fontSize: "48px",
    position: "absolute", // Absolute positioning for centering
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%)", // Offset to truly center
    fontFamily: "Syne Mono, monospace",
    fontWeight: "bold",
    color: "grey",
  },
};

const HeadToHead = () => {
  return (
    <div style={styles.container}>
      {/* Left Character */}
      <div style={styles.characterContainer}>
        <Character
          image="/path/to/character1.png" // Replace with actual image paths
          traits={[
            { type: "Virtue", text: "Helps grandma cross the street" },
            { type: "Vice", text: "Helps grandma cross the street" },
            { type: "Trade", text: "Helps grandma cross the street" },
            { type: "Tidbit", text: "Helps grandma cross the street cats" },
          ]}
        />
      </div>

      {/* Middle Section */}
      <div style={styles.middleContainer}>
        {/* <div style={styles.timer}>00:30</div> */}
        {/* <img style={styles.mainTitle} src="img/question.svg" /> */}
        <div style={styles.subtitle}>The boys are asking</div>
        <div style={styles.mainTitle}>Would you like to go on a date?</div>
        <div style={{ marginTop: "-60px", ...styles.subtitle }}>
          Who would you pick?
        </div>
      </div>
      <div style={styles.vsText}>VS</div>

      {/* Right Character */}
      <div style={styles.characterContainer}>
        <Character
          image="/path/to/character2.png" // Replace with actual image paths
          traits={[
            { type: "Virtue", text: "Helps grandma cross the street" },
            { type: "Vice", text: "Helps grandma cross the street" },
            { type: "Trade", text: "Helps grandma cross the street" },
            { type: "Tidbit", text: "Helps grandma cross the street dogs" },
          ]}
        />
      </div>
    </div>
  );
};

export default HeadToHead;
