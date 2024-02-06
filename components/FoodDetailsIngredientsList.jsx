import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FoodListItem from "./FoodListItem";

const FoodDetailsIngredientsList = ({ ingredients }) => {

  const filteredIngredients = ingredients.filter(ing => ing !== '')

  return (
    <View style={{ paddingHorizontal: 18, marginTop: 20 }}>
      <Text style={styles.allIngredientsText}>All Ingredients</Text>
      <View>
        {filteredIngredients?.map((ing) => (
          <FoodListItem foodName={ing} key={ing} foodSupplier={"Ingredient"} />
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
