import React from "react";
import TraitCard from "./Trait";
import TraitStack from "./TraitStack";
import "../theme.css";

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
  },
  characterText: {
    fontFamily: "Candy Darling, sans-serif",
    fontSize: "104px",
    color: "var(--virtue-color)",
    marginBottom: "-100px",
    zIndex: 10,
    textShadow: `
      -2.03px 2.03px 1.35px #FFD6E8, 
      0px 0px 2.35px #2B1A21
    `,
  },
  traitsWrapper: {
    marginTop: -50,
  },
};

const Character = ({ name, image, traits, dir }) => {
  const getImageRotation = (dir) => {
    const rotation = Math.random() * 10;
    return dir === "left" ? -rotation : rotation;
  };

  const getTextRotation = (dir) => {
    const rotation = Math.random() * (25 - 15) + 15;
    return dir === "left" ? -rotation : rotation;
  };

  const getTextShift = (dir) => {
    const shift = Math.random() * (80 - 60) + 60;
    return dir === "left" ? -shift : shift;
  };

  return (
    <div style={styles.character}>
      <div
        style={{
          transform: `translateX(${getTextShift(
            dir
          )}px) rotate(${getTextRotation(dir)}deg)`,

          ...styles.characterText,
        }}
      >
        {name}
      </div>
      <img
        src={image}
        alt="Character"
        style={{
          transform: `rotate(${getImageRotation(dir)}deg)`,
          ...styles.characterImage,
        }}
      />

      <div style={styles.traitsWrapper}>
        <TraitStack traits={traits} />
      </div>
    </div>
  );
};

export default Character;
