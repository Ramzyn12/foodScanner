import { View, Text } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";

const HealthBar = ({ barType, progress, isLastLoggedToday }) => {
  const barColour = isLastLoggedToday ? COLOURS.darkGreen : COLOURS.lightGray
  return (
    <View
      style={{
        backgroundColor: "#F7F6EF",
        height: 20,
        flex: 1,
        borderTopLeftRadius: barType === 'left' ? 12 : 6,
        borderBottomLeftRadius: barType === 'left' ? 12 : 6,
        borderTopRightRadius: barType === 'right' ? 12 : 6,
        borderBottomRightRadius: barType === 'right' ? 12 : 6,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: barColour,
          width: `${progress}%`,
          height: "100%",
          borderTopLeftRadius: barType === 'left' ? 12 : 6,
          borderBottomLeftRadius: barType === 'left' ? 12 : 6,
          borderTopRightRadius: barType === 'right' ? 12 : 6,
          borderBottomRightRadius: barType === 'right' ? 12 : 6,
        }}
      ></View>
    </View>
  );
};

export default HealthBar;
