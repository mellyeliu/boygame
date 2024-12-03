import React from "react";
import TraitCard from "./Trait"; // Import the existing TraitCard component

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const styles = {
  traitStack: {
    position: "relative",
    width: "300px", // Adjust to fit the cards
    height: "350px", // Adjust to fit the staggered stack
  },
  cardPosition: (index) => {
    const offsets = [
      {
        top: "0px",
        left: `${getRandomNumber(30, 50)}px`,
        rotate: `${getRandomNumber(-5, 5)}deg`,
      },
      {
        top: "80px",
        left: `${getRandomNumber(-50, -30)}px`,
        rotate: `${getRandomNumber(-5, 6)}deg`,
      },
      {
        top: "150px",
        left: `${getRandomNumber(30, 50)}px`,
        rotate: `${getRandomNumber(-6, 3)}deg`,
      },
      {
        top: "210px",
        left: `${getRandomNumber(-50, -30)}px`,
        rotate: `${getRandomNumber(-3, 6)}deg`,
      },
    ];
    return {
      position: "absolute",
      top: offsets[index].top,
      left: offsets[index].left,
      transform: `rotate(${offsets[index].rotate})`,
    };
  },
};

const TraitStack = ({ traits }) => (
  <div style={styles.traitStack}>
    {traits.map((trait, index) => (
      <div key={index} style={styles.cardPosition(index)}>
        <TraitCard text={trait.text} type={trait.type} />
      </div>
    ))}
  </div>
);

export default TraitStack;
