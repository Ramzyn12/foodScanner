import React from "react";
import Svg, { G, Circle, Defs, ClipPath, Rect } from "react-native-svg";
import COLOURS from '../constants/colours'

const CircularProgress = ({ progress }) => {
  const strokeWidth = 6; // Width of the progress stroke
  const size = 30; // Size of the SVG
  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = radius * 2 * Math.PI; // Circumference of the circle

  // Calculate the stroke dash offset based on the progress
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <G clipPath="url(#clip0_229_695)">
        <Rect
          x="0.571411"
          y="0.5"
          width="30"
          height="30"
          rx="15"
          fill="white"
        />
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={COLOURS.lightGreen} // Color of the background circle
          strokeWidth={strokeWidth}
        />
        {/* Foreground circle (progress) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={COLOURS.darkGreen} // Color of the progress
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" // Round the ends of the progress stroke
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start progress from the top
        />
      </G>
      <Defs>
        <ClipPath id="clip0_229_695">
          <Rect
            x="0.571411"
            y="0.5"
            width="30"
            height="30"
            rx="15"
            fill="white"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CircularProgress;
