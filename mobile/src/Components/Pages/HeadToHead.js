import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PickYourFaveBoy = () => {
  const boys = [
    { name: "HUNTER", image: "/test-boys/1.png" },
    { name: "HUNTER", image: "/test-boys/2.png" },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const rotations = useState(() =>
    boys.map(() => Math.floor(Math.random() * 31) - 15)
  )[0];

  const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "black",
      position: "relative",
      overflow: "hidden",
      fontFamily: "Syne Mono, sans-serif",
      color: "white",
    },
    title: {
      position: "absolute",
      top: "3vh",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "1rem",
      textAlign: "center",
      fontFamily: "Xanh Mono, sans-serif",
    },
    card: (index) => ({
      position: "absolute",
      width: "200px",
      transformOrigin: "center",
      borderRadius: "12px",
      overflow: "hidden",
      ...(index === 0
        ? { top: "17%", left: "10%" }
        : { bottom: "17%", right: "10%" }),
      cursor: "pointer",
    }),
    image: {
      width: "100%",
      display: "block",
      borderRadius: "6px 6px 0 0",
    },
    label: {
      backgroundColor: "#1A1A1A",
      color: "white",
      textAlign: "center",
      padding: "14px 0",
      fontSize: "0.85rem",
      fontFamily: "Syne Mono, sans-serif",
      borderRadius: "0 0 6px 6px",
    },
    blackScreen: {
      backgroundColor: "black",
      display: "flex",
      height: "100vh",
      width: "100vw",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#aaa",
      fontFamily: "Xanh Mono, sans-serif",
    },
  };

  return (
    <>
      {!submitted ? (
        <div style={styles.container}>
          <div style={styles.title}>Pick your fave BOY</div>
          <AnimatePresence>
            {boys.map((boy, index) =>
              activeIndex === null || activeIndex === index ? (
                <motion.div
                  key={index}
                  style={styles.card(index)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: activeIndex === index ? 0.94 : 1,
                    boxShadow:
                      activeIndex === index
                        ? "0 0 18px 4px rgba(255, 0, 200, 0.8)"
                        : "0 0 5px rgba(0,0,0,0.3)",
                    border:
                      activeIndex === index ? "3px solid white" : "0px solid white",
                    transform: `rotate(${rotations[index]}deg)`,
                    borderRadius: "12px",
                  }}
                  exit={{
                    scale: 0.1,
                    y: "-100vh",
                    opacity: 0,
                    transition: { duration: 1.2, ease: "easeInOut" },
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  onClick={() => {
                    if (activeIndex === null) {
                      setActiveIndex(index);
                      setTimeout(() => {
                        setSubmitted(true);
                      }, 1200); // match exit duration
                    }
                  }}
                >
                  <img src={boy.image} alt={boy.name} style={styles.image} />
                  <div style={styles.label}>{boy.name}</div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div style={{backgroundColor: "black"}}>
        <motion.div
          style={styles.blackScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div style={{ color: "white", padding: "1vh" }}>
            Your boy has been submitted
          </div>
          Waiting for other players
        </motion.div>
        </div>
      )}
    </>
  );
};

export default PickYourFaveBoy;
