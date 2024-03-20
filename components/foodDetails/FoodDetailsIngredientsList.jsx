import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FoodListItem from "../diary/FoodListItem";
import { useSelector } from "react-redux";
import COLOURS from '../../constants/colours'

const FoodDetailsIngredientsList = () => {
  const currentFood = useSelector((state) => state.food.currentFood);
  const filteredIngredients = currentFood.ingredients;

  return (
    <View style={{ marginTop: 20, padding: 20, borderWidth: 1, borderColor: COLOURS.lightGray, borderRadius: 20 }}>
      <Text style={styles.titleText}>Ingredients</Text>
      <Text style={styles.subtitleText}>All ingredients found in this product.</Text>
      <Text style={styles.ingredientsText}>{filteredIngredients}</Text>
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
