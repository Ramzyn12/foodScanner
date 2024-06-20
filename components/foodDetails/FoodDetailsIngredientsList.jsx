import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FoodListItem from "../diary/FoodListItem";
import { useSelector } from "react-redux";
import COLOURS from '../../constants/colours'
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const FoodDetailsIngredientsList = () => {
  const currentFood = useSelector((state) => state.food.currentFood);
  const filteredIngredients = currentFood.ingredients;
  const {theme} = useColourTheme()
  const subtitle = currentFood.ingredients ? 'All ingredients found in this product.' : 'Ingredients currently missing for this product'
  return (
    <View style={{ marginTop: 20, padding: 20, borderWidth: 1, borderColor: themedColours.stroke[theme], borderRadius: 20 }}>
      <Text style={[styles.titleText, {color: themedColours.primaryText[theme]}]}>Ingredients</Text>
      <Text style={[styles.subtitleText, {color: themedColours.secondaryText[theme], paddingBottom: currentFood.ingredients ? 20 : 0}]}>{subtitle}</Text>
      {currentFood.ingredients && <Text style={[styles.ingredientsText, {color: themedColours.primaryText[theme]}]}>{filteredIngredients}</Text>}
    </View>
  );
};

export default FoodDetailsIngredientsList;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 19,
    marginBottom: 6,
    color: COLOURS.nearBlack
  },
  subtitleText: {
    fontSize: 14,
    fontFamily: 'Mulish_700Bold',
    color: '#636566',
    paddingBottom: 20
  },
  ingredientsText: {
    fontSize: 14,
    fontFamily: 'Mulish_400Regular',
    color: COLOURS.nearBlack
  }
});
