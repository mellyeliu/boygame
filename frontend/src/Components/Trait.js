import React from "react";
import "../theme.css";
import "../fonts.css";

const styles = {
  traitCard: (type) => ({
    display: "flex",
    alignItems: "center",
    width: "calc(var(--desktop-character-width, 300px) - 20px)",
    padding: "12px",
    borderRadius: "8px",
    boxShadow: "var(--card-shadow)",
    textAlign: "left",
    fontFamily: "Syne Mono",
    backgroundColor: `var(--${type.toLowerCase()}-bg-color)`,
  }),
  icon: {
    width: "50px",
    height: "50px",
    marginRight: "8px",
    objectFit: "contain",
  },
  text: (type) => ({
    flex: 1,
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
