import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";

const FoodListItem = ({ foodSelected, foodItem }) => {
  //Change colours based on scores
  // THIS IS A SHARED COMPONENT hence the foodSelected from grocery

  const processedState = foodItem?.processedState;
  const background =
    processedState === "Processed"
      ? COLOURS.badFoodBackground
      : COLOURS.greatFoodBackground;
  const textColour =
    processedState === "Processed"
      ? COLOURS.badFoodText
      : COLOURS.greatFoodText;


  return (
    <View style={styles.foodListItemContainer}>
      {/* image */}
      {foodItem?.image_url && (
        <Image
          style={styles.image}
          source={{
            uri: foodItem?.image_url, //Or some default?
          }}
        />
      )}
      <View style={styles.foodListItem}>
        <Text
          style={[
            styles.foodNameText,
            foodSelected && { textDecorationLine: "line-through" },
          ]}
        >
          {foodItem?.name}
        </Text>
        {foodItem?.brand && (
          <Text style={styles.foodSupplierText}>{foodItem?.brand}</Text>
        )}
      </View>
      {/* Score */}
      <View style={[styles.scoreBackground, { backgroundColor: background }]}>
        <Text style={[styles.scoreText, { color: textColour }]}>
          {processedState || "N/A"}
        </Text>
      </View>
    </View>
  );
};

export default FoodListItem;

const styles = StyleSheet.create({
  foodListItemContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    gap: 14,
  },
  image: { width: 36, height: 36, alignSelf: "center", objectFit: "cover" },
  foodListItem: {
    gap: 3,

    flex: 1,
  },
  foodNameText: {
    fontFamily: "Mulish_500Medium",
    fontSize: 16,
  },
  foodSupplierText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 11,
    color: COLOURS.tabUnselected,
  },
  scoreBackground: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: COLOURS.greatFoodBackground,
  },
  scoreText: {
    color: COLOURS.greatFoodText,
    fontFamily: "Mulish_700Bold",
    fontSize: 14,
  },
});
