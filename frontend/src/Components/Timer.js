import React, { useState, useEffect } from "react";

const CountdownCircle = ({
  duration = 30,
  sizeVH = 6, // Size as a percentage of viewport height
  color = "black",
  backgroundColor = "#ccc",
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Convert vh values to pixels
  const size = window.innerHeight * (sizeVH / 100); // Size in pixels based on vh
  const strokeWidth = 0.001 * window.innerHeight; // Stroke width in pixels based on vh

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = (timeLeft / duration) * circumference;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          if (onComplete) {
            onComplete();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onComplete]);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s linear",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: size / 4,
          fontFamily: "Syne Mono",
          color: "white",
        }}
      >
        {timeLeft}
      </div>
    </div>
  );
};

export default CountdownCircle;
