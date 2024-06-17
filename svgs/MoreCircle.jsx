import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import { themedColours } from "../constants/themedColours";
import { useColourTheme } from "../context/Themed";

const MoreCircle = () => {
  const {theme} = useColourTheme()
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M18.3332 10C18.3332 14.6024 14.6022 18.3334 9.99984 18.3334C5.39746 18.3334 1.6665 14.6024 1.6665 10C1.6665 5.39765 5.39746 1.66669 9.99984 1.66669C14.6022 1.66669 18.3332 5.39765 18.3332 10Z"
        stroke={themedColours.primaryText[theme]}
        stroke-width="1.5"
      />
      <Path
        d="M7.49967 10C7.49967 10.4603 7.12658 10.8334 6.66634 10.8334C6.2061 10.8334 5.83301 10.4603 5.83301 10C5.83301 9.53978 6.2061 9.16669 6.66634 9.16669C7.12658 9.16669 7.49967 9.53978 7.49967 10Z"
        fill={themedColours.primaryText[theme]}
      />
      <Path
        d="M10.833 10C10.833 10.4603 10.4599 10.8334 9.99967 10.8334C9.53944 10.8334 9.16634 10.4603 9.16634 10C9.16634 9.53978 9.53944 9.16669 9.99967 9.16669C10.4599 9.16669 10.833 9.53978 10.833 10Z"
        fill={themedColours.primaryText[theme]}
      />
      <Path
        d="M14.1663 10C14.1663 10.4603 13.7932 10.8334 13.333 10.8334C12.8728 10.8334 12.4997 10.4603 12.4997 10C12.4997 9.53978 12.8728 9.16669 13.333 9.16669C13.7932 9.16669 14.1663 9.53978 14.1663 10Z"
        fill={themedColours.primaryText[theme]}
      />
    </Svg>
  );
};

export default MoreCircle;
