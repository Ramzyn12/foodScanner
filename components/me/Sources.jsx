import { View, Text } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import ArrowRight from "../../svgs/ArrowRight";
import SingleSource from "./SingleSource";

const Sources = () => {
  return (
    <View
      style={{
        padding: 20,
        gap: 20,
        backgroundColor: "#F5F5F5",
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          fontSize: 19,
          fontFamily: "Mulish_700Bold",
          color: COLOURS.nearBlack,
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
