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
    height: "75vh",
    justifyContent: "center", // Center character and traits vertically
  },
  characterImage: {
    minHeight: "50vh",
    width: "auto",
    boxShadow: "var(--card-shadow)",
    borderRadius: "1vh",
  },
  characterText: {
    fontFamily: "Candy Darling, sans-serif",
    fontSize: "clamp(3rem, 9vh, 30rem)",
    color: "var(--virtue-color)",
    marginBottom: "-10vh",
    zIndex: 10,
    textShadow: `
      -0.5px 2.03px 1.35px #FFD6E8, 
      0px 0px 2.35px #2B1A21
    `,
  },
  traitsWrapper: {
    width: "100%",
    height: "50%", // Traits span 50% of the 80% (10% per trait for 5 traits)
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
    const shift = Math.random() * (10 - 5) + 5;
    return dir === "left" ? -shift : shift;
  };

  return (
    <div style={styles.character}>
      <div
        style={{
          transform: `translateX(${getTextShift(
            dir
          )}vw) rotate(${getTextRotation(dir)}deg)`,

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
