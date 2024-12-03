import React from "react";
import TraitCard from "./Trait";
import TraitStack from "./TraitStack";
import "../theme.css";

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const styles = {
  character: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  characterImage: {
    maxWidth: "var(--desktop-character-width)",
    boxShadow: "var(--card-shadow)",
    borderRadius: "8px",
    transform: `rotate(${getRandomNumber(-5, 6)}deg)`,
  },
  traitsWrapper: {
    marginTop: -50,
  },
};

const Character = ({ image, traits }) => (
  <div style={styles.character}>
    <img
      src={"img/boys/finn.png"}
      alt="Character"
      style={styles.characterImage}
    />

    <div style={styles.traitsWrapper}>
      <TraitStack traits={traits} />
    </div>
  </div>
);

export default Character;
