import { View, Text } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import Flask from "../../svgs/Flask";
import RainDrops from "../../svgs/RainDrops";
import PalmTree from "../../svgs/PalmTree";
import { themedColours } from "../../constants/themedColours";
import { useColourTheme } from "../../context/Themed";
import InfoCircle from "../../svgs/InfoCircle";

const FoodDetailReasonCard = ({ type, currentFood }) => {
  const { theme } = useColourTheme();
  let backgroundColor;
  let svg;
  let message;
  if (type === "Additive") {
    svg = <Flask />;
    backgroundColor = currentFood.additives.length > 0 ? "#FAD8D5" : "#CAE2C3";
    message = currentFood.additives.length > 0 ? `Additives` : "No additives";
  } else if (type === "Vegetable") {
    svg = <RainDrops />;
    backgroundColor = currentFood.hasVegetableOil ? "#FAD8D5" : "#CAE2C3";
    message = currentFood.hasVegetableOil ? "Seed oil" : "No seed oil";
  } else if (type === "Palm") {
    svg = <PalmTree />;
    backgroundColor = currentFood.hasPalmOil === "Yes" ? "#FAD8D5" : "#CAE2C3";
    message = currentFood.hasPalmOil === "Yes" ? "Palm oil" : "No palm oil";
  } else if (type === "Nova") {
    svg = <InfoCircle color={themedColours.primaryText[theme]} />;
    backgroundColor =
      currentFood?.NovaScore === 3 || currentFood?.NovaScore === 4
        ? "#FAD8D5"
        : "#CAE2C3";
    message = `Nova ${currentFood?.NovaScore || ""}`;
  } else if (type === "Ingredients") {
    svg = (
      <Text
        style={{
          fontFamily: "Mulish_400Regular",
          fontSize: 20,
          color: themedColours.primaryText[theme],
        }}
      >
        3
      </Text>
    );
    backgroundColor = currentFood?.IngredientCount < 3 ? "#FAD8D5" : "#CAE2C3";
    message = `Ingredients`;
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
