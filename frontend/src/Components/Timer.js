import React, { useState, useEffect } from "react";

const CountdownCircle = ({
  duration = 30,
  size = 60,
  strokeWidth = 1,
  color = "black",
  backgroundColor = "#ccc",
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = (timeLeft / duration) * circumference;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration]);

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
