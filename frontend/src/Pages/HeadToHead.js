import React from "react";
import Character from "../Components/Character";
import Timer from "../Components/Timer";

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
    top: "20%",
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
    top: "0%",
    left: "50%",
    transform: "translate(0%, -50%)",
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
      <div style={styles.characterContainer}>
        <Character
          dir="left"
          name="Troye"
          image="/img/boys/finn.png"
          traits={[
            { type: "Virtue", text: "Helps grandma cross the street" },
            { type: "Vice", text: "Helps grandma cross the street" },
            { type: "Trade", text: "Helps grandma cross the street" },
            { type: "Tidbit", text: "Helps grandma cross the street cats" },
          ]}
        />
      </div>

      <div style={styles.middleContainer}>
        <div style={styles.timer}>
          <Timer />
        </div>
        <div style={styles.subtitle}>The boys are asking</div>
        <div style={styles.mainTitle}>Would you like to go on a date?</div>
        <div style={{ marginTop: "-60px", ...styles.subtitle }}>
          Who would you pick?
        </div>
      </div>
      <div style={styles.vsText}>VS</div>

      <div style={styles.characterContainer}>
        <Character
          dir="right"
          name="Hunter"
          image="/img/boys/hunter.png"
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
