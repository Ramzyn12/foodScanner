import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { useSelector } from "react-redux";
import { color } from "@rneui/base";
import { Path, Svg } from "react-native-svg";
import DangerTriangle from "../../svgs/DangerTriangle";

const FoodDetailsScoreStrip = ({ processedScore }) => {
  // const score = useSelector((state) => state.food.currentFood?.processedScore);
  const currentFood = useSelector((state) => state.food.currentFood);
  const processedState = currentFood?.processedState;
  const background =
    processedState === "Processed"
      ? COLOURS.badFoodBackground
      : COLOURS.greatFoodBackground;
  const textColour =
    processedState === "Processed"
      ? COLOURS.badFoodText
      : COLOURS.greatFoodText;
  const isUnknown = processedState === "Unknown";
  const message = isUnknown
    ? "Unknown"
    : processedState === "Processed"
    ? "Avoid"
    : "Great choice";

  return (
    <View style={[styles.container]}>
      {processedState === "Processed" && (
        <View style={styles.warningMessageContainer}>
          <DangerTriangle />
          <Text style={styles.warningMessageText}>
            This product is processed. If you choose to eat this, it will reset
            your streak.{" "}
          </Text>
        </View>
      )}
      {isUnknown && (
        <View style={styles.warningMessageContainer}>
          <DangerTriangle />
          <View style={{ flex: 1 }}>
            <Text style={styles.warningMessageText}>
              We’re not sure if this item is processed or not as it does not
              exist in our database yet.
            </Text>
            <Pressable hitSlop={20} onPress={() => console.log('OPen email')}>
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: "Mulish_700Bold",
                  color: COLOURS.darkGreen,
                  fontSize: 14,
                }}
              >
                Let us know
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default FoodDetailsScoreStrip;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    backgroundColor: "white",
    gap: 14,
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
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    flexDirection: "row",
    gap: 10,
    padding: 12,
    alignItems: "flex-start",
    borderRadius: 12,
  },
  warningMessageText: {
    fontFamily: "Mulish_400Regular",
    fontSize: 14,
    flex: 1,
    color: COLOURS.nearBlack,
  },
});
