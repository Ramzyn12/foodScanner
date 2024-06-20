import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const InfoCircle = ({color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <Path
        d="M9 8.25V12.75M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M9.75 6C9.75 6.41421 9.41421 6.75 9 6.75C8.58579 6.75 8.25 6.41421 8.25 6C8.25 5.58579 8.58579 5.25 9 5.25C9.41421 5.25 9.75 5.58579 9.75 6Z"
        fill={color}
      />
    </Svg>
  );
};

export default InfoCircle;
