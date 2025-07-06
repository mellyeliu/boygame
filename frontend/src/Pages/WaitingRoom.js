import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Player from "../Components/Player";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "black",
    color: "white",
    fontFamily: "Xanh Mono, sans-serif",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2vh",
  },
  roomCode: {
    fontSize: "clamp(2rem, 4vh, 8rem)",
    marginBottom: "3vh",
    textAlign: "center",
    fontStyle: "italic",
  },
  separator: {
    fontSize: "clamp(1rem, 2vh, 4rem)",
    margin: "4vh 0",
    textAlign: "center",
    color: "#fff",
  },
  playerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    columnGap: "4vh",
    rowGap: "3vh",
    maxWidth: "80vw",
    margin: "2vh 0",
  },
  placeholderCharacter: {
    width: "100%",
    height: "100%",
    backgroundColor: "#181818",
    border: "1px solid #3E3E3E",
    borderRadius: "1vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(0.8rem, 1.5vh, 3rem)",
    color: "#808080",
  },
};

const WaitingRoom = () => {
  const { roomCode } = useParams();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/room/${roomCode}/players`
        );
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        console.error("Failed to fetch players:", err);
      }
    };

    fetchPlayers();
    const interval = setInterval(fetchPlayers, 2000);
    return () => clearInterval(interval);
  }, [roomCode]);

  // Create array of 6 slots (filled with players or placeholders)
  const playerSlots = Array.from({ length: 6 }, (_, index) => {
    const player = players[index];
    return (
      player || {
        id: `placeholder-${index}`,
        name: "Waiting...",
        isPlaceholder: true,
      }
    );
  });

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.roomCode}>Room Code: {roomCode}</div>

        <div style={styles.separator}>
          •---------------- • ˚｡ ⋆୨♡୧⋆ ˚｡ • ----------------•
        </div>

        <div style={styles.playerGrid}>
          {playerSlots.map((player, index) => (
            <div key={player.id || `placeholder-${index}`}>
              <Player
                name={player.isPlaceholder ? "Waiting..." : player.name}
                image="/img/players/mel.png"
                isActive={!player.isPlaceholder}
                motion={false}
                large={true}
              />
            </div>
          ))}
        </div>

        <div style={styles.separator}>
          •---------------- • ˚｡ ⋆୨♡୧⋆ ˚｡ • ----------------•
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
