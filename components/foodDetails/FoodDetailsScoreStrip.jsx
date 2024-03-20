import { View, Text, StyleSheet } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { useSelector } from "react-redux";
import { color } from "@rneui/base";
import { Path, Svg } from "react-native-svg";
import DangerTriangle from "../../svgs/DangerTriangle";

const FoodDetailsScoreStrip = ({ processedScore }) => {
  // const score = useSelector((state) => state.food.currentFood?.processedScore);
  const currentFood = useSelector((state) => state.food.currentFood)
  const processedState = currentFood?.processedState
  const background = processedState === 'Processed' ? COLOURS.badFoodBackground : COLOURS.greatFoodBackground
  const textColour = processedState === 'Processed' ? COLOURS.badFoodText : COLOURS.greatFoodText

  const message = processedState === 'Processed' ? 'Avoid' : 'Great choice'

  return (
    <View style={[styles.container, { backgroundColor: COLOURS.lightGreen }]}>
      <View style={styles.innerContainer}>
        <Text style={[styles.description]}>{message}</Text>
        <View style={[styles.scoreBackground, { backgroundColor: background }]}>
          <Text style={[styles.scoreText, { color: textColour }]}>
            {processedState}
          </Text>
        </View>
      </View>
      {processedState === 'Processed' && <View style={styles.warningMessageContainer}>
        <DangerTriangle />
        <Text style={styles.warningMessageText}>This product is processed. If you choose to eat this, it will reset your 26 day streak. </Text>
      </View>}
    </View>
  );
};

export default FoodDetailsScoreStrip;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLOURS.greatFoodBackground,
    gap: 14
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  description: {
    fontFamily: "Mulish_700Bold",
    fontSize: 18,
    color: COLOURS.nearBlack,
  },
  scoreBackground: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: COLOURS.greatFoodText,
  },
  scoreText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 14,
  },
  warningMessageContainer: {
    backgroundColor: 'rgba(255, 74, 74, 0.12)',
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    alignItems: 'flex-start',
    borderRadius: 12
  },
  warningMessageText: {
    fontFamily: 'Mulish_400Regular',
    fontSize: 14,
    flex: 1,
    color: COLOURS.nearBlack
  }
});
