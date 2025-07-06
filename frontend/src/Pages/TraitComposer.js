import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Timer from "../Components/Timer";
import Player from "../Components/Player";
import BackgroundText from "../Components/BackgroundText";
import InnerShadowText from "../Components/InnerShadowText";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "black",
    position: "relative",
  },
  topContainer: {
    flex: "0 0 80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  middleContainer: {
    flex: 1,
    zIndex: 10,
    display: "flex",
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1vh",
  },
  timer: {
    position: "absolute",
    top: "3vh",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  },
  subtitle: {
    fontSize: "2.3vh",
    fontWeight: "400",
    fontFamily: "Syne Mono, sans-serif",
    color: "white",
    marginTop: "1vh",
  },
  mainTitle: (trait) => ({
    zIndex: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "5vh",
  }),
  separator: {
    fontSize: "clamp(1rem, 2vh, 4rem)",
    margin: "4vh 0",
    textAlign: "center",
    color: "#fff",
    fontFamily: "Xanh Mono",
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
    zIndex: 2,
  },
};

const TraitComposer = () => {
  const { roomCode, trait = "virtue" } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const traits = ["virtue", "vice", "trade", "tidbit", "boy"];

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

  const handleTimerComplete = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      const currentIndex = traits.indexOf(trait);
      const nextIndex = (currentIndex + 1) % traits.length;
      const nextTrait = traits[nextIndex];

      navigate(`/trait/${nextTrait}/${roomCode}`, { replace: true });
      setIsTransitioning(false);
    }, 3000); // 3 second transition
  };

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
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
          zIndex: 1000,
          opacity: isTransitioning ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
          pointerEvents: "none",
        }}
      />
      <BackgroundText />
      <div style={styles.timer}>
        <Timer
          key={trait}
          duration={5}
          sizeVH={6}
          onComplete={handleTimerComplete}
        />
      </div>
      <div style={styles.topContainer}>
        <div style={styles.middleContainer}>
          <div style={styles.subtitle}>
            {trait === "boy" ? "Generate your" : "Come up with as many"}
          </div>
          <div style={styles.mainTitle(trait)}>
            <InnerShadowText
              text={
                trait === "boy"
                  ? "Boy"
                  : trait.charAt(0).toUpperCase() + trait.slice(1) + "s"
              }
              shadows={[
                {
                  dx: -2,
                  dy: 2,
                  blur: 2,
                  color: "#FFFFFF",
                  id: "whiteShadow",
                },
              ]}
              width={800}
              height={200}
              style={{
                fontSize: 140,
                fontFamily: "Candy Darling, sans-serif",
                fill: `var(--${trait}-color)`,
                textAnchor: "middle",
                dominantBaseline: "central",
              }}
            />
          </div>
          <div style={styles.subtitle}>
            {trait === "boy" ? "" : "as you can in 60 seconds"}
          </div>
          <div style={styles.separator}>
            •---------------- • ˚｡ ⋆୨♡୧⋆ ˚｡ • ----------------•
          </div>
        </div>
      </div>

      <div style={styles.bottomBar}>
        {playerSlots.slice(0, 3).map((player, index) => (
          <Player
            key={player.id || `placeholder-${index}`}
            name={player.isPlaceholder ? "Waiting..." : player.name}
            image="/img/players/mel.png"
            isActive={!player.isPlaceholder}
            motion={true}
            large={false}
          />
        ))}
      </div>
    </div>
  );
};

export default TraitComposer;
