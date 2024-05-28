import { View, Text } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import Flask from "../../svgs/Flask";
import RainDrops from "../../svgs/RainDrops";
import PalmTree from "../../svgs/PalmTree";
import { themedColours } from "../../constants/themedColours";
import { useColourTheme } from "../../context/Themed";

const FoodDetailReasonCard = ({ type, currentFood }) => {
  const {theme} = useColourTheme()
  let backgroundColor;
  let svg;
  let message;
  if (type === "Additive") {
    svg = <Flask />;
    backgroundColor = currentFood.additives.length > 0 ? "#FAD8D5" : "#CAE2C3";
    message =
      currentFood.additives.length > 0
        ? `${currentFood.additives.length} additives`
        : "No additives";
  } else if (type === "Vegetable") {
    svg = <RainDrops />;
    backgroundColor = currentFood.hasVegetableOil ? "#FAD8D5" : "#CAE2C3";
    message = currentFood.hasVegetableOil
      ? "Vegetable oil"
      : "No vegetable oil";
  } else if (type === "Palm") {
    svg = <PalmTree />;
    backgroundColor = currentFood.hasPalmOil ? "#FAD8D5" : "#CAE2C3";
    message = currentFood.hasPalmOil ? "Palm oil" : "No palm oil";
  }

  return (
    <View style={{ gap: 8 }}>
      <View
        style={{
          width: 44,
          alignSelf: "center",
          height: 44,
          backgroundColor: backgroundColor,
          borderRadius: 44,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {svg}
      </View>
      <Text
        style={{
          fontFamily: "Mulish_400Regular",
          fontSize: 14,
          color: themedColours.primaryText[theme],
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default FoodDetailReasonCard;
