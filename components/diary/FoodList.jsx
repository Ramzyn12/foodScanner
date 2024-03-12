import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import AddFoodButton from "./AddFoodButton";
import FoodListItem from "./FoodListItem";
import COLOURS from "../../constants/colours";
import { useQuery } from "@tanstack/react-query";
import { getDiaryDay } from "../../axiosAPI/diaryDayAPI";
import FruitBowlIcon from "../../svgs/FruitBowlIcon";
import { useNavigation } from "@react-navigation/native";

const FoodList = ({ diaryFoodItems, emptyFoodList }) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.foodListContainer,
        emptyFoodList && { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
      ]}
    >
      {/* Food List Item */}
      {diaryFoodItems?.consumedFoods?.map((item) => (
        <Pressable
          onPress={() =>
            navigation.navigate("FoodDetailsModal", { barcodeId: item.barcode })
          }
          key={item._id}
        >
          <FoodListItem
            foodItem={item}
            foodName={item.name}
            foodSupplier={item.brand}
          />
        </Pressable>
      ))}

      {diaryFoodItems?.consumedSingleFoods?.map((item) => (
        <Pressable
          onPress={() =>
            navigation.navigate("FoodDetailsModal", { singleFoodId: item._id })
          }
          key={item._id}
        >
          <FoodListItem foodItem={item} />
        </Pressable>
      ))}

      {emptyFoodList && (
        <View style={styles.emptyListContainer}>
          <FruitBowlIcon />
          <Text style={styles.emptyListText}>Add food to get started</Text>
        </View>
      )}
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
  emptyListContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  emptyListText: {
    fontFamily: "Mulish_500Medium",
    fontSize: 16,
    color: COLOURS.tabUnselected,
  },
});
