import React, { useState } from "react";
import Timer from "./Timer";

const TRAIT_TYPES = {
  virtue: {
    title: "Think of a virtue",
    subtitle: "What’s a green flag in someone? Maybe they’re a cyclist and recyclist, or they read poetry to their cat.",
    gif: "trait-icons/virtue.png",
    defaultText: "Honesty",
  },
  vice: {
    title: "Think of a vice",
    subtitle: "What's your guilty pleasure?",
    gif: "trait-icons/vice.png",
    defaultText: "Procrastination",
  },
  trade: {
    title: "Write down a job",
    subtitle: "What are you known for?",
    gif: "trait-icons/trade.png",
    defaultText: "Coding",
  },
  tidbit: {
    title: "Share a Tidbit",
    subtitle: "What's a fun fact about you?",
    gif: "trait-icons/tidbit.png",
    defaultText: "I love coffee!",
  },
};

const TraitComposer = ({ type = "virtue" }) => {
  const [inputValue, setInputValue] = useState("");

  const trait = TRAIT_TYPES[type] || TRAIT_TYPES.virtue;

  return (
    <div
      style={{
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
      }}
    >
        <div
        style={{
          position: "absolute",
          top: "3%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Timer sizeVH="4"/>
      </div>
      <img
        src={trait.gif}
        alt={`${type} gif`}
        style={{ width: "150px", height: "150px", marginBottom: "20px" }}
      />
      <div style={{ paddingBottom: "0.5vh", fontFamily: "Xanh Mono, sans-serif", fontSize: "1.5rem", marginBottom: "10px" }}>{trait.title}</div>
      <div style={{  width: '78%',color: "grey", fontFamily: "Syne Mono, sans-serif", fontSize: "0.9rem", marginBottom: "20px" }}>{trait.subtitle}</div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder=""
        style={{
          width: '75%',
          height: '10vh',
          border: "0.5px solid grey",
          borderRadius: "5px",
          marginBottom: "2vh",
          background: "#181818",
          fontFamily: "Syne Mono, sans-serif"
        }}
      />
      <button
        style={{
          width: "75%",
          padding: "15px",
          backgroundColor: "#FFA6CB",
          color: "black",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontFamily: "Syne Mono, sans-serif",
          fontSize: "1rem"
        }}
      >
        Submit
      </button>
      <p
        style={{
          fontSize: "0.9rem",
          cursor: "pointer",
          fontFamily: "Syne Mono, sans-serif",
          color: "grey",
        }}
        onClick={() => setInputValue(trait.defaultText)}
      >
        Think of one for me°•💭
      </p>
    </div>
  );
};

export default TraitComposer;
