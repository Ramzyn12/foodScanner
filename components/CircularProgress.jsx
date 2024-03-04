import React from "react";
import Svg, { G, Circle, Defs, ClipPath, Rect } from "react-native-svg";
import COLOURS from '../constants/colours'

const CircularProgress = ({ progress }) => {
  const strokeWidth = 6; // Width of the progress stroke
  const size = 30; // Size of the SVG
  // The radius needs to account for the stroke width to prevent clipping
  const radius = (size - strokeWidth) / 2; // Adjusted radius
  const circumference = radius * 2 * Math.PI; // Circumference of the circle

  // Calculate the stroke dash offset based on the progress
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Svg
      width={size}
      height={size}
      // Adjust the viewBox to account for the stroke width, ensuring no clipping
      viewBox={`0 0 ${size} ${size}`} // Resetting viewBox to original suggestion
      fill="none"
    >
      {/* Background circle */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={COLOURS.lightGreen} // Background circle color
        strokeWidth={strokeWidth}
      />
      {/* Foreground circle (progress) */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={COLOURS.darkGreen} // Progress circle color
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round" // Round the ends of the progress stroke
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start progress from the top
      />
    </Svg>
  );
};



export default CircularProgress;
