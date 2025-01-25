import React from "react";
import Character from "../Components/Character";
import Timer from "../Components/Timer";
import Player from "../Components/Player";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "black",
  },
  topContainer: {
    flex: "0 0 80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  characterContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  middleContainer: {
    flex: 1,
    zIndex: 10,
    display: "flex",
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    flexDirection: "column",
    alignItems: "center",
    gap: "2vh",
  },
  timer: {
    fontWeight: "bold",
    color: "#333",
    top: "30%",
    left: "50%",
    transform: "translate(0%, 0%)",
  },
  subtitle: {
    fontSize: "clamp(1.5rem, 1.4vh, 10rem)",
    fontWeight: "400",
    fontFamily: "Syne Mono, sans-serif",
    color: "white",
    marginTop: "3vh",
  },
  mainTitle: {
    fontFamily: "Candy Darling, sans-serif",
    color: "#fff",
    zIndex: 20,
    fontSize: "clamp(7.5rem, 2.5vh, 10rem)",
    color: "var(--virtue-color)",
    textAlign: "center",
    whiteSpace: "nowrap",
    padding: "0vh 8vw",
    minWidth: "clamp(600px, 10vw, 2000px)",
    minHeight: "10vh",
    paddingTop: "2.5vh",
  },
  bottomBar: {
    flex: "0 0 20%",
    width: "75%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    color: "white",
    fontSize: "16px",
    fontFamily: "Syne Mono, sans-serif",
    marginLeft: "12.5%",
  },
};

const Brainstorm = ({title}) => {
  return (
    <div style={styles.container}>
      <div style={styles.topContainer}>
        <div style={styles.middleContainer}>
          <div style={styles.timer}>
            <Timer sizeVH={13} />
          </div>
          <div style={styles.subtitle}>Write down 3</div>
          <div style={styles.mainTitle}>{title}</div>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <Player name="Mel" image={"img/players/mel.png"} isActive={true} />
        <Player name="Verli" image={"img/players/verli.png"} />
        <Player name="Ava" image={"img/players/ava.png"} isActive={true} />
        <Player name="Mel" image={"img/players/mel.png"} isActive={true} />
        <Player name="Verli" image={"img/players/verli.png"} />
        <Player name="Ava" image={"img/players/ava.png"} />
      </div>
    </div>
  );
};

export default Brainstorm;
