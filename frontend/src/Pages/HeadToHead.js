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
    flex: "0 0 85%",
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
    height: "80%",
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
    gap: "2vh",
  },
  timer: {
    fontWeight: "bold",
    color: "#333",
    top: "10%",
    left: "50%",
    transform: "translate(0%, -10%)",
  },
  subtitle: {
    fontSize: "clamp(0.5rem, 1.4vh, 10rem)",
    fontWeight: "400",
    fontFamily: "Syne Mono, sans-serif",
    color: "white",
  },
  mainTitle: {
    fontFamily: "Xanh Mono, sans-serif",
    color: "#fff",
    zIndex: 20,
    fontSize: "clamp(1.5rem, 2.5vh, 10rem)",
    textAlign: "center",
    backgroundImage: "url('img/question.svg')",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    whiteSpace: "nowrap",
    backgroundPosition: "center",
    padding: "0vh 8vw",
    minWidth: "clamp(600px, 10vw, 2000px)",
    minHeight: "10vh",
    paddingTop: "2.5vh",
  },
  vsText: {
    fontSize: "clamp(3rem, 5vh, 20rem)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontFamily: "Syne Mono, monospace",
    fontWeight: "bold",
    color: "grey",
  },
  bottomBar: {
    flex: "0 0 15%",
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

const HeadToHead = ({title}) => {
  return (
    <div style={styles.container}>
      <div style={styles.topContainer}>
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
            <Timer sizeVH={6} />
          </div>
          <div style={styles.subtitle}>The boys are asking</div>
          <div style={styles.mainTitle}>{title}</div>
          <div style={{ marginTop: "-5vh", ...styles.subtitle }}>
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

export default HeadToHead;
