import { View, Text, StyleSheet, Keyboard } from "react-native";
import React from "react";
import COLOURS from '../constants/colours'
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import FoodListItem from "./FoodListItem";

const RecentSearchList = () => {
  return (
    <>
      <Text style={styles.recentText}>Recent</Text>
      <BottomSheetScrollView showsVerticalScrollIndicator={false} onScrollEndDrag={Keyboard.dismiss}>
        <BottomSheetView style={styles.foodListContainer}>
          <View style={styles.foodListItemContainer}>
            <FoodListItem foodItem={{ name: "Apple", brand: "Tesco" }} />
          </View>
          <View style={styles.foodListItemContainer}>
            <FoodListItem foodItem={{ name: "Apple", brand: "Ingredient" }} />
          </View>
          <View style={styles.foodListItemContainer}>
            <FoodListItem foodItem={{ name: "Apple", brand: "Ingredient" }} />
          </View>
        </BottomSheetView>
      </BottomSheetScrollView>
    </>
  );
};

export default RecentSearchList;


const styles = StyleSheet.create({
  foodListContainer: {
    borderTopWidth: 2,
    borderTopColor: 'white',
    marginBottom: 80,
  },
  foodListItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.lightGray,
    paddingVertical: 2,
  },
  recentText: { fontSize: 16, paddingBottom: 10, fontFamily: "Mulish_700Bold" },
})
