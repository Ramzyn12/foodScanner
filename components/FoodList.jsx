import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AddFoodButton from "./AddFoodButton";
import FoodListItem from "./FoodListItem";
import COLOURS from "../constants/colours";
import { useQuery } from "@tanstack/react-query";
import { getDiaryDay } from "../axiosAPI/diaryDayAPI";
import FruitBowlIcon from "../svgs/FruitBowlIcon";

const DUMMY_FOODS = [
  { id: 1, foodName: "Apple", foodSupplier: "Tesco" },
  { id: 2, foodName: "Pineapple Fruit Juice", foodSupplier: "Morrisons" },
  { id: 3, foodName: "Sweet potato", foodSupplier: "Fresh" },
  { id: 4, foodName: "Apple", foodSupplier: "Tesco" },
  { id: 5, foodName: "Pineapple Fruit Juice", foodSupplier: "Morrisons" },
  { id: 6, foodName: "Sweet potato", foodSupplier: "Fresh" },
];
//Cant use flatlist since inside another scrollView

const FoodList = ({foodItems}) => {
  
  const noFoods = foodItems?.consumedFoods.length === 0

  return (
    <View style={[styles.foodListContainer, noFoods && {borderTopLeftRadius: 20, borderTopRightRadius: 20}]}>
      {/* Food List Item */}
      {foodItems?.consumedFoods?.map((item) => (
        <FoodListItem
          key={item._id}
          foodItem={item}
          foodName={item.name}
          foodSupplier={item.brand}
        />
      ))}
      {foodItems?.consumedFoods?.length === 0 && <View style={{height: 200, alignItems: 'center', justifyContent: 'center', gap: 15}}>
          <FruitBowlIcon />
          <Text style={{fontFamily: 'Mulish_500Medium', fontSize: 16, color: COLOURS.tabUnselected}}>Add food to get started</Text>
        </View>}
      {/* More food button */}
      <AddFoodButton />
    </View>
  );
};

export default FoodList;

const styles = StyleSheet.create({
  foodListContainer: {
    borderColor: COLOURS.lightGray,
    borderWidth: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 6,
    paddingHorizontal: 15,
  },
});
