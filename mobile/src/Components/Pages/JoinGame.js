import React, { useState } from "react";

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    backgroundImage: "url('/mobile-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "top",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontFamily: "Xanh Mono, sans-serif",
  },
  input: {
    width: "75%",
    padding: "10px",
    marginBottom: "2vh",
    border: "0.5px solid grey",
    borderRadius: "5px",
    backgroundColor: "#181818",
    color: "white",
    fontFamily: "Syne Mono, sans-serif",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  button: {
    width: "75%",
    padding: "15px",
    backgroundColor: "#FFA6CB",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontFamily: "Syne Mono, sans-serif",
    fontSize: "1rem",
  },
  error: {
    color: "red",
    marginTop: "1vh",
    fontFamily: "Syne Mono, sans-serif",
  },
};

const JoinGame = () => {
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJoin = async () => {
    if (!roomCode || !playerName) {
      setError("Please enter both room code and name.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3001/api/room/${roomCode}/player/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: playerName,
          picture: "",
          loveQuote: "",
          isVip: false,
        }),
      });

      const text = await res.text();
      console.log("📦 Raw response:", text);

      if (!res.ok) {
        let errData = {};
        try {
          errData = JSON.parse(text);
        } catch (e) {}
        setError(errData.error || "Failed to join room.");
        setLoading(false);
        return;
      }

      let player;
      try {
        player = JSON.parse(text);
      } catch (err) {
        setError("Invalid server response.");
        setLoading(false);
        return;
      }

      console.log("🎉 Player joined:", player);
      // store player or redirect
    } catch (err) {
      console.error("❌ UNEXPECTED JOIN ERROR:", err);
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Enter Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Enter Your Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleJoin} style={styles.button} disabled={loading}>
        {loading ? "Joining..." : "Join Game"}
      </button>
      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

export default JoinGame;
