import React from "react";
import "../theme.css";
import "../fonts.css";

const styles = {
  traitCard: (type) => ({
    display: "flex",
    alignItems: "center",
    // minHeight: "100%",
    // width: "calc(var(--desktop-character-width, 300px) - 20px)",
    padding: "0.2vh 1vh",
    minHeight: "75px",
    maxHeight: "10vh",
    maxWidth: "20vw",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "1vh",
    boxShadow: "var(--card-shadow)",
    textAlign: "left",
    fontSize: "clamp(1rem, 1.7vh, 10rem)",
    fontFamily: "Syne Mono",
    backgroundColor: `var(--${type.toLowerCase()}-bg-color)`,
  }),
  icon: {
    width: "3vw",
    aspectRatio: "1 / 1",
    marginRight: "8px",
    objectFit: "contain",
  },
  text: (type) => ({
    flex: 1,
    marginLeft: "0.5vw",
    fontFamily: "Syne Mono, monospace",
    color: `var(--${type.toLowerCase()}-color)`,
  }),
};

const TraitCard = ({ type, text }) => (
  <div style={styles.traitCard(type)}>
    <img
      src={`/img/trait-icons/${type}.png`}
      alt={`${type} icon`}
      style={styles.icon}
    />
    <p style={styles.text(type)}>{text}</p>
  </div>
);

export default TraitCard;
