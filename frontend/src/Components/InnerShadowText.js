import React from "react";

export default function InnerShadowText({
  text,
  style = {},
  shadows,
  width = 500,
  height = 100,
}) {
  const {
    fontSize = 48,
    fontFamily = "sans-serif",
    fill = "#fff",
    ...restStyle
  } = style;

  return (
    <svg width={width} height={height}>
      <defs>
        {shadows.map((shadow, index) => {
          const { dx, dy, blur, color } = shadow;
          const id = `inner-shadow-${index}`;
          shadow._id = id; // mutate to pass to text later
          return (
            <filter id={id} key={id}>
              <feComponentTransfer in="SourceAlpha">
                <feFuncA type="table" tableValues="1 0" />
              </feComponentTransfer>
              <feGaussianBlur stdDeviation={blur} />
              <feOffset dx={dx} dy={dy} result="offsetblur" />
              <feComposite
                in2="SourceAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
                result="innerShadow"
              />
              <feFlood floodColor={color} result="color" />
              <feComposite
                in="color"
                in2="innerShadow"
                operator="in"
                result="shadowColor"
              />
              <feComposite
                in="shadowColor"
                in2="SourceGraphic"
                operator="over"
              />
            </filter>
          );
        })}
      </defs>

      {shadows.map((shadow, i) => (
        <text
          key={i}
          x={width / 2}
          y={height / 2 + fontSize / 8}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fill={fill}
          filter={`url(#${shadow._id})`}
          textAnchor="middle"
          dominantBaseline="central"
          style={restStyle}
        >
          {text}
        </text>
      ))}
    </svg>
  );
}
