import { View, Text } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import Flask from "../../svgs/Flask";
import RainDrops from "../../svgs/RainDrops";
import PalmTree from "../../svgs/PalmTree";
import { themedColours } from "../../constants/themedColours";
import { useColourTheme } from "../../context/Themed";
import InfoCircle from "../../svgs/InfoCircle";
import { Log } from "victory-native";

const QuestionMark = () => {
  const { theme } = useColourTheme();

  return (
    <Text
      style={{
        fontSize: 20,
        fontWeight: 400,
        color: themedColours.primaryText[theme],
      }}
    >
      ?
    </Text>
  );
};

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
    svg =
      currentFood.hasVegetableOil === "Unknown" ? (
        <QuestionMark />
      ) : (
        <RainDrops />
      );
    backgroundColor =
      currentFood.hasVegetableOil === "Unknown"
        ? themedColours.secondaryBackground[theme]
        : currentFood.hasVegetableOil
        ? "#FAD8D5"
        : "#CAE2C3";
    message = currentFood.hasVegetableOil ? "Seed oil" : "No seed oil";
  } else if (type === "Palm") {
    svg =
      currentFood?.hasPalmOil === "Unknown" ? <QuestionMark /> : <PalmTree />;
    backgroundColor =
      currentFood.hasPalmOil === "Yes"
        ? "#FAD8D5"
        : currentFood.hasPalmOil === "No"
        ? "#CAE2C3"
        : themedColours.secondaryBackground[theme];
    message = currentFood.hasPalmOil === "No" ? "No palm oil" : "Palm oil";
  } else if (type === "Nova") {
    svg = currentFood?.novaScore ? (
      <InfoCircle color={themedColours.primaryText[theme]} />
    ) : (
      <QuestionMark />
    );
    backgroundColor = !currentFood?.novaScore
      ? themedColours.secondaryBackground[theme]
      : currentFood?.novaScore === 3 || currentFood?.novaScore === 4
      ? "#FAD8D5"
      : "#CAE2C3";
    message = `Nova ${currentFood?.novaScore || ""}`;
  } else if (type === "Ingredients") {
    svg = currentFood?.ingredientsCount ? (
      <Text
        style={{
          fontFamily: "Mulish_400Regular",
          fontSize: 20,
          color: themedColours.primaryText[theme],
        }}
      >
        {currentFood?.ingredientsCount}
      </Text>
    ) : (
      <QuestionMark />
    );

    backgroundColor = !currentFood?.ingredientsCount
      ? themedColours.secondaryBackground[theme]
      : currentFood?.ingredientsCount >= 3
      ? "#FAD8D5"
      : "#CAE2C3";
    message = `Ingredients`;
  }

  return (
    <View style={{ gap: 8, alignItems: 'center',}}>
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
