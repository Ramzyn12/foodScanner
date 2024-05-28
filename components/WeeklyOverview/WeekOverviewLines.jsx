import { View, Text } from "react-native";
import React from "react";
import COLOURS from '../../constants/colours'
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const WeekOverviewLines = ({daysFinished}) => {
  const {theme} = useColourTheme()
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
            backgroundColor: i < currentDayIndex ? themedColours.primary[theme] : themedColours.stroke[theme],
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
