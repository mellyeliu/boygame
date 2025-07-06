import React from "react";

// Background text from bg.txt - left section only
const leftBgText = `      ⋆.✩..              ⋆=★✩⊹⋆.⋆⊹⊹.
    ⋆⋆⋆    +.         ⋆⊹.             .★.    .⋆+...    ..⊹. ★⊹⋆⋆..
      ✩   ⋆.+.     ⊹⋆✩.      ⊹.⋆.     .+⊹⋆     .. ⋆⊹+⋆
      .+✩★+.    +. ⊹.     ⊹⋆     .    ✩ ⊹+
            ✩⋆⊹⋆⋆+. .⊹      ⋆⊹      ✩   ⋆✩.
            ⋆★     +.      ✩          ⊹.
          +⊹⋆      +.        +⊹.    .★⊹
          .⋆⋆+⊹✩⊹+⋆.  ⊹.        +⊹★⊹+
      ++.          ⋆⊹ ⋆⋆
    ★⋆                ⋆⋆⋆
    ★.      ⋆⊹✩⊹          ..
  ⋆⋆    .+      ⊹✩
  ⊹.    ⋆        .⊹
    ⊹    ..  ⋆     ✩
    .            ★.
    .⊹⋆.      ..✩
    ..   ⋆⊹✩★⊹⋆
    .⊹
    ⋆⋆.
      ⋆+.
      +.
        ⋆.
    +  ⊹
    ⊹⋆
    ⋆⋆
    .+.
  .⊹
  .`;

const BackgroundText = ({
  color = "#eee",
  fontSize = "1.6vh",
  opacity = 1,
  zIndex = 1,
}) => {
  const styles = {
    backgroundText: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
      zIndex: zIndex,
      display: "flex",
      justifyContent: "space-between",
      padding: "0.8vh 0.1vh",
      fontSize: fontSize,
      lineHeight: "1.4",
      color: color,
      opacity: opacity,
      fontFamily: "monospace",
      whiteSpace: "pre",
    },
    leftBgText: {
      textAlign: "left",
    },
    rightBgText: {
      textAlign: "left",
      transform: "scaleX(-1)", // Flip the text horizontally
    },
  };

  return (
    <div style={styles.backgroundText}>
      <div style={styles.leftBgText}>{leftBgText}</div>
      <div style={styles.rightBgText}>{leftBgText}</div>
    </div>
  );
};

export default BackgroundText;
