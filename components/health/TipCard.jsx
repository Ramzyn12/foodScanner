import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import SaladBowl from "../../svgs/SaladBowl";



const TipCard = ({item, cardHeight, cardMargin}) => {
  return (
    <View style={[styles.cardContainer, {height: cardHeight,
      marginVertical: cardMargin / 2,}]}>
      <View style={styles.iconContainer}>
        <SaladBowl />
      </View>
      <Text style={{ fontSize: 18, fontFamily: "Mulish_400Regular" }}>
        {item.text}
      </Text>
    </View>
  );
};

export default TipCard;


const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    padding: 40,
    gap: 40,
    // width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 60, // Increased the radius
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F6EF",
    borderRadius: 20,
  },
  backButtonContainer: {
    backgroundColor: "white",
    width: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    height: 40,
    alignSelf: "flex-start",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
