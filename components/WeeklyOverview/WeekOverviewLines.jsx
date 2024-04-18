import { View, Text } from "react-native";
import React from "react";
import COLOURS from '../../constants/colours'

const WeekOverviewLines = ({daysFinished}) => {
  const currentDayIndex = daysFinished;
  const generateLines = () => {
    const elements = [];
    for (let i = 0; i < 7; i++) {
      elements.push(
        <View
          key={i}
          style={{
            height: 6,
            flex: 1,
            borderRadius: 30,
            backgroundColor: i < currentDayIndex ? COLOURS.darkGreen : "rgba(0, 0, 0, 0.08)",
          }}
        />
      );
    }
    return elements;
  };
  return (
    <View style={{  flexDirection: "row", gap: 6 }}>
      {generateLines()}
    </View>
  );
};

export default WeekOverviewLines;
