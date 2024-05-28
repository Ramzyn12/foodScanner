import { View, Text } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import ArrowRight from "../../svgs/ArrowRight";
import SingleSource from "./SingleSource";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const Sources = () => {
  const {theme} = useColourTheme()
  return (
    <View
      style={{
        padding: 20,
        gap: 20,
        backgroundColor: themedColours.secondaryBackground[theme],
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          fontSize: 19,
          fontFamily: "Mulish_700Bold",
          color: themedColours.primaryText[theme],
        }}
      >
        Sources
      </Text>
      <SingleSource />
      <SingleSource />
      <SingleSource />
    </View>
  );
};

export default Sources;
