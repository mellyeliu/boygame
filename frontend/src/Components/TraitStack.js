import React, { useRef, useState, useEffect } from "react";
import TraitCard from "./Trait"; // Import the existing TraitCard component

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const TraitStack = ({ traits }) => {
  const stackRef = useRef(null); // Ref for the container
  const [cardHeight, setCardHeight] = useState(0); // State to store the actual card height

  useEffect(() => {
    if (stackRef.current) {
      const firstCard = stackRef.current.querySelector(".trait-card"); // Assuming TraitCard has a className
      if (firstCard) {
        setCardHeight(firstCard.getBoundingClientRect().height); // Get the actual card height
      }
    }
  }, []);

  const styles = {
    traitStack: {
      position: "relative",
      marginTop: "-5vh",
      width: "100%",
      height: "100%", // Dynamic height for the stack
    },
    cardPosition: (index) => ({
      position: "absolute",
      top: `${index * 7}vh`, // Calculate top based on measured card height
      left: `${getRandomNumber(-5, 5)}vw`, // Randomized horizontal offset
      transform: `rotate(${getRandomNumber(-5, 5)}deg)`, // Randomized rotation
      width: "100%",
      height: "4vh",
    }),
  };

  return (
    <div ref={stackRef} style={styles.traitStack}>
      {traits.map((trait, index) => (
        <div
          key={index}
          style={styles.cardPosition(index)}
          className="trait-card"
        >
          <TraitCard text={trait.text} type={trait.type} />
        </div>
      ))}
    </div>
  );
};

export default TraitStack;
