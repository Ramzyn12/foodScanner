import { View, Text, StyleSheet } from "react-native";
import React from "react";
import COLOURS from "../constants/colours";
import { useSelector } from "react-redux";

const FoodDetailsScoreStrip = ({ processedScore }) => {

  const score = useSelector(state => state.food.currentFood?.processedScore)
  //Darker
  const background = score <= 75 && score > 50 ? COLOURS.okayFoodText : score <= 50 ? COLOURS.badFoodText : COLOURS.greatFoodText
  //Lighter
  const text = score <= 75 && score > 50 ? COLOURS.okayFoodBackground : score <= 50 ? COLOURS.badFoodBackground : COLOURS.greatFoodBackground

  const message = score <= 75 && score > 50 ? 'Try to avoid this product' : score <= 50 ? 'This product is a bad choice' : 'This product is a great choice'

  return (
    <View style={[styles.container, {backgroundColor: text}]}>
      <Text style={[styles.description, {color: background}]}>{message}</Text>
      <View style={[styles.scoreBackground, {backgroundColor: background}]}>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
    </View>
  );
};

export default FoodDetailsScoreStrip;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 18,
    backgroundColor: COLOURS.greatFoodBackground,
    alignItems: "center",
    justifyContent: "space-between",
  },
  description: {
    color: COLOURS.greatFoodText,
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
  },
  scoreBackground: {
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 54,
    borderRadius: 6,
    backgroundColor: COLOURS.greatFoodText,
  },
  scoreText: {
    color: "#FFFFFF",
    fontFamily: "Mulish_600SemiBold",
    fontSize: 14,
  },
});
