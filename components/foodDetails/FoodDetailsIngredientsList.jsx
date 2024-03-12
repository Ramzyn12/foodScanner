import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FoodListItem from "../diary/FoodListItem";
import { useSelector } from "react-redux";

const FoodDetailsIngredientsList = () => {

  const currentFood = useSelector(state => state.food.currentFood)
  const filteredIngredients = currentFood.ingredients.filter(ing => ing !== '')

  return (
    <View style={{ paddingHorizontal: 18, marginTop: 20 }}>
      <Text style={styles.allIngredientsText}>All Ingredients</Text>
      <View>
        {filteredIngredients?.map((ing) => (
          <FoodListItem key={ing} foodItem={{name: ing, brand: ''}} />
        ))}
      </View>
    </View>
  );
};

export default FoodDetailsIngredientsList;

const styles = StyleSheet.create({
  allIngredientsText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
    marginBottom: 10,
  },
});
