import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InnerShadowText from "../Components/InnerShadowText";

const Homepage = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [activeRect, setActiveRect] = useState(-1); // -1 means none active

  useEffect(() => {
    // Check if we already have a room code in localStorage
    const existingRoomCode = localStorage.getItem("roomCode");
    if (existingRoomCode) {
      console.log("Using existing room code:", existingRoomCode);
      setRoomCode(existingRoomCode);
    } else {
      // Only generate new room code if one doesn't exist
      console.log("No existing room code found, creating new one...");
      createGame();
    }
  }, []);

  // Animation effect for rectangles
  useEffect(() => {
    if (!roomCode || roomCode.length !== 4) return;
    let current = 0;
    let timeout;
    let running = true;

    const animate = () => {
      setActiveRect(current);
      if (current < 3) {
        timeout = setTimeout(() => {
          current += 1;
          animate();
        }, 350); // 0.35s between each (slower)
      } else {
        // After last, clear highlight and pause for 3s
        setTimeout(() => setActiveRect(-1), 350);
        timeout = setTimeout(() => {
          current = 0;
          animate();
        }, 3000);
      }
    };
    animate();
    return () => {
      running = false;
      clearTimeout(timeout);
      setActiveRect(-1);
    };
  }, [roomCode]);

  const createGame = async () => {
    try {
      console.log("Creating game...");
      const res = await fetch("http://localhost:3000/api/game/create", {
        method: "POST",
      });
      const game = await res.json();
      console.log("Game response:", game);
      if (res.ok && game.code) {
        console.log("Setting room code:", game.code);
        setRoomCode(game.code);
        // Store the room code in localStorage for persistence
        localStorage.setItem("roomCode", game.code);
      } else {
        console.error("failed to create game:", game);
      }
    } catch (err) {
      console.error("error creating game:", err);
    }
  };

  const startGame = () => {
    if (roomCode) {
      navigate(`/waiting/${roomCode}`);
    }
  };

  const createNewGame = () => {
    // Clear existing room code and create a new one
    localStorage.removeItem("roomCode");
    setRoomCode("");
    createGame();
  };

  const styles = {
    container: {
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflow: "auto",
      backgroundColor: "#101010",
    },
    imageWrapper: {
      position: "relative",
      width: "fit-content",
      height: "100vh",
      margin: "0 auto",
    },
    image: {
      height: "100vh",
      width: "auto",
    },
    roomCodeContainer: {
      position: "absolute",
      top: "60%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      zIndex: 10,
    },
    roomCodeSquare: (index) => {
      const shadowColors = ["#FFBED8", "#BC88FF", "#73C0FF", "#A7FFD4"];
      const isActive = activeRect === index;
      const shadowAlpha = isActive ? "100" : "80"; // more intense when active
      const baseStyle = {
        width: "17vh",
        height: "11vh",
        backgroundColor: "#181818",
        border: "1px solid #3E3E3E",
        borderRadius: "1.5vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10vh",
        fontFamily: "Syne Mono, sans-serif",
        fontWeight: 100,
        boxShadow:
          "inset 5px -5px 5px " +
          shadowColors[index] +
          shadowAlpha +
          ", inset 5px 5px 5px #000000B3",
        position: "relative",
        transition: "transform 0.7s cubic-bezier(.4,2,.6,1)",
        transform: isActive ? "scale(1.05)" : "scale(1)",
      };
      // Stagger positioning
      switch (index) {
        case 0:
          return { ...baseStyle, top: "0", left: "45px" };
        case 1:
          return { ...baseStyle, top: "-30px", left: "15px" };
        case 2:
          return { ...baseStyle, top: "30px", left: "-15px" };
        case 3:
          return { ...baseStyle, top: "0", left: "-45px" };
        default:
          return baseStyle;
      }
    },
    button: {
      padding: "1.7vh 3vh",
      backgroundColor: "#3B3B3B",
      color: "white",
      border: "1px solid #808080",
      fontSize: "2vh",
      borderRadius: "5vh",
      fontFamily: "Syne Mono, sans-serif",
      boxShadow:
        "inset 3.52px -3.52px 2.35px rgba(0, 0, 0, 0.25), inset -3.52px 3.52px 2.35px rgba(255, 255, 255, 0.5)",
      cursor: "pointer",
      transition: "transform 0.2s ease",
    },
    // newGameButton: {
    //   padding: "0.5vh 1vh",
    //   backgroundColor: "181818",
    //   color: "#808080",
    //   border: "1px solid #808080",
    //   fontSize: "1.2vh",
    //   borderRadius: "0.5vh",
    //   fontFamily: "Syne Mono, sans-serif",
    //   cursor: "pointer",
    //   transition: "transform 0.2s ease",
    //   marginTop: "1vh",
    // },
    buttonContainer: {
      position: "absolute",
      top: "79%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.8vh",
    },
    instructionText: {
      color: "#FFF",
      fontSize: "1.5vh",
      fontFamily: "Syne Mono, sans-serif",
      marginBottom: "1vh",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageWrapper}>
        <img src="/img/home.png" alt="Title Screen" style={styles.image} />

        {roomCode && (
          <div style={styles.roomCodeContainer}>
            {roomCode.split("").map((char, index) => {
              const shadowColors = ["#FFBED8", "#BC88FF", "#73C0FF", "#A7FFD4"];
              const mainColor = shadowColors[index];
              // Create a darker version of the main color for the dark shadow
              const darkColor =
                mainColor === "#FFBED8"
                  ? "#7A294B"
                  : mainColor === "#BC88FF"
                  ? "#5A1F4A"
                  : mainColor === "#73C0FF"
                  ? "#1F4A7A"
                  : "#1A7A4A";

              return (
                <div key={index} style={styles.roomCodeSquare(index)}>
                  <InnerShadowText
                    text={char}
                    shadows={[
                      {
                        dx: -1,
                        dy: 1,
                        blur: 1,
                        color: "#000",
                        id: "whiteShadow",
                      },
                      {
                        dx: 2,
                        dy: -2,
                        blur: 1,
                        color: "#FFFFFF",
                        id: "blackShadow",
                      },
                    ]}
                    width={140}
                    height={100}
                    style={{
                      fontSize: 60,
                      fontFamily: "Syne Mono, monospace",
                      fontWeight: 100,
                      fill: mainColor,
                      textAnchor: "middle",
                      dominantBaseline: "middle",
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div style={styles.buttonContainer}>
          <div style={styles.instructionText}>
            Join the room on your phone by visiting
          </div>
          <button
            style={styles.button}
            onClick={startGame}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            join.boygame.online
          </button>
          {/* <button
            style={styles.newGameButton}
            onClick={createNewGame}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            new game
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
