import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const NotificationBell = ({color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="17"
      viewBox="0 0 14 17"
      fill="none"
    >
      <Path
        d="M10.1373 2.51397C9.48128 1.88827 8.59183 1.5 7.60215 1.5H6.32496C4.11664 1.5 2.40803 3.43548 2.68194 5.62675L2.74146 6.10289C2.85106 6.97973 2.53077 7.85557 1.88135 8.45485C0.994315 9.27339 0.74787 10.5762 1.27464 11.6622L1.35216 11.822C1.84998 12.8483 2.8904 13.5 4.03108 13.5H10.1967C11.1742 13.5 12.0839 13.0006 12.6087 12.176C13.3496 11.0119 13.1534 9.48485 12.1423 8.5459L12.1094 8.51533C11.9267 8.34565 11.7687 8.15535 11.6373 7.94989M4.13733 13.5L4.43733 14.0143C5.78733 16.3286 8.48733 16.3286 9.83733 14.0143L10.1373 13.5"
        stroke={color || "#1F2C35"}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M12.3875 5.25C12.3875 6.07843 11.7159 6.75 10.8875 6.75C10.059 6.75 9.38745 6.07843 9.38745 5.25C9.38745 4.42157 10.059 3.75 10.8875 3.75C11.7159 3.75 12.3875 4.42157 12.3875 5.25Z"
        fill={color || "#1F2C35"}
      />
    </Svg>
  );
};

export default NotificationBell;
