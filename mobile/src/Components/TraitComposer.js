import React, { useState } from "react";
import Timer from "./Timer";

const TRAIT_TYPES = {
  virtue: {
    title: "Think of a virtue",
    subtitle: "What’s a green flag in someone? Maybe they’re a cyclist and recyclist, or they read poetry to their cat.",
    gif: "trait-icons/virtue.png",
    suggestions: [
      "Makes a fan website for you",
      "Drops off soup for you when you're sick",
      "Does your laundry when you have a busy day",
      "Massages your temples when you're stressed",
      "Gives you a jar full of compliment-filled paper stars",
      "Makes documentary films for forest restoration",
      "Volunteers at a nonprofit for global literacy",
    ],
  },
  vice: {
    title: "Think of a vice",
    subtitle: "What's your guilty pleasure?",
    gif: "trait-icons/vice.png",
    suggestions: [
      "Binge-watching shows for hours",
      "Eating ice cream straight from the tub",
      "Procrastinating on important tasks",
      "Overspending on unnecessary things",
      "Staying up late for no reason",
    ],
  },
  trade: {
    title: "Write down a job",
    subtitle: "What are you known for?",
    gif: "trait-icons/trade.png",
    suggestions: [
      "Lawyer",
      "Software engineer",
      "Carpenter",
      "Teacher",
      "Chef",
    ],
  },
  tidbit: {
    title: "Share a Tidbit",
    subtitle: "What's a fun fact about you?",
    gif: "trait-icons/tidbit.png",
    suggestions: [
      "Can solve a Rubik's cube in under a minute",
      "Visited 15 countries",
      "Plays three musical instruments",
      "Bakes sourdough bread every weekend",
      "Collects vintage postcards",
    ],
  },
};

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
  timerWrapper: {
    position: "absolute",
    top: "3%",
    left: "50%",
    transform: "translateX(-50%)",
  },
  gif: {
    width: "150px",
    height: "150px",
    marginBottom: "20px",
  },
  title: {
    paddingBottom: "0.5vh",
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  subtitle: {
    width: "78%",
    color: "grey",
    fontSize: "0.9rem",
    marginBottom: "20px",
    fontFamily: "Syne Mono, sans-serif",
    lineHeight: "1.3em",
  },
  textarea: {
    width: "75%",
    height: "10vh",
    border: "0.5px solid grey",
    borderRadius: "5px",
    marginBottom: "2vh",
    textAlign: "left",
    lineHeight: "1.5",
    color: "white",
    boxSizing: "border-box",
    padding: "10px",
    background: "#181818",
    fontFamily: "Syne Mono, sans-serif",
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
  suggestion: {
    fontSize: "0.9rem",
    cursor: "pointer",
    fontFamily: "Syne Mono, sans-serif",
    color: "grey",
  },
};

const TraitComposer = ({ type = "virtue" }) => {
  const [inputValue, setInputValue] = useState("");

  const trait = TRAIT_TYPES[type] || TRAIT_TYPES.virtue;

  return (
    <div style={styles.container}>
      <div style={styles.timerWrapper}>
        <Timer sizeVH="4" />
      </div>
      <img src={trait.gif} alt={`${type} gif`} style={styles.gif} />
      <div style={styles.title}>{trait.title}</div>
      <div style={styles.subtitle}>{trait.subtitle}</div>
      <textarea
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder=""
        style={styles.textarea}
      />
      <button style={styles.button}>Submit</button>
      <p
        style={styles.suggestion}
        onClick={() =>
          setInputValue(
            trait.suggestions[
              Math.floor(Math.random() * trait.suggestions.length)
            ]
          )
        }
      >
        Think of one for me°•💭
      </p>
    </div>
  );
};

export default TraitComposer;
