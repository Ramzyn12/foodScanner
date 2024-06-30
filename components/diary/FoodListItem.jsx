import { View, Text, StyleSheet } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import unknown from "../../assets/unknown.webp";
import { themedColours } from "../../constants/themedColours";
import { useColourTheme } from "../../context/Themed";
import { Path, Svg } from "react-native-svg";
import NoImage from "../../svgs/NoImage";
import { Image } from 'expo-image';

const FoodListItem = ({ foodSelected, foodItem }) => {
  // This should be shared component
  const { theme } = useColourTheme();
  const processedState = foodItem?.processedState;
  const isUnknown = foodItem?.processedState === "Unknown";
  const background = isUnknown
    ? themedColours.secondaryBackground[theme]
    : processedState === "Processed"
    ? COLOURS.badFoodBackground
    : COLOURS.greatFoodBackground;
  const textColour = isUnknown
    ? themedColours.secondaryText[theme]
    : processedState === "Processed"
    ? COLOURS.badFoodText
    : COLOURS.greatFoodText;

  return (
    <View style={styles.foodListItemContainer}>
      {/* image */}
      {foodItem?.image_url ? (
        <Image style={styles.image} contentFit="cover" source={{ uri: foodItem.image_url }} />
      ) : (
        <View
          style={{
            width: 36,
            backgroundColor: themedColours.secondaryBackground[theme],
            borderRadius: 12,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NoImage />
        </View>
      )}
      <View style={styles.foodListItem}>
        <Text
          style={[
            styles.foodNameText,
            { color: themedColours.primaryText[theme] },
            foodSelected && { textDecorationLine: "line-through" },
          ]}
        >
          {foodItem?.name}
        </Text>
        {foodItem?.brand && (
          <Text
            style={[
              styles.foodSupplierText,
              { color: themedColours.secondaryText[theme] },
            ]}
          >
            {foodItem?.brand}
          </Text>
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
