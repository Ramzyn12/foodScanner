import { View, Text, StyleSheet } from "react-native";
import React from "react";
import COLOURS from "../constants/colours";

const FoodListItem = ({ foodName, foodSupplier, foodItem }) => {
  //Change colours based on scores
  
  return (
    <View style={styles.foodListItemContainer}>
      {/* Item and shop (if shop) */}
      <View style={styles.foodListItem}>
        <Text style={styles.foodNameText}>{foodItem?.name}</Text>
        <Text style={styles.foodSupplierText}>{foodItem?.brand}</Text>
      </View>
      {/* Score */}
      <View style={styles.scoreBackground}>
        <Text style={styles.scoreText}>{foodItem?.processedScore || 100}</Text>
      </View>
    </View>
  );
};

export default FoodListItem;

const styles = StyleSheet.create({
  foodListItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    gap: 6,
  },
  foodListItem: {
    gap: 5,
    flex: 1,
  },
  foodNameText: {
    fontFamily: "Mulish_500Medium",
    fontSize: 16,
  },
  foodSupplierText: {
    fontFamily: "Mulish_500Medium",
    fontSize: 11,
    color: COLOURS.tabUnselected,
  },
  scoreBackground: {
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 54,
    borderRadius: 6,
    backgroundColor: COLOURS.greatFoodBackground,
  },
  scoreText: {
    color: COLOURS.greatFoodText,
    fontFamily: "Mulish_700Bold",
    fontSize: 14,
  },
});
