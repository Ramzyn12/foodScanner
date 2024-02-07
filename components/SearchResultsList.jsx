import { View, Text, Keyboard, StyleSheet, Pressable } from "react-native";
import React from "react";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import FoodListItem from "./FoodListItem";
import COLOURS from '../constants/colours'
import { useNavigation } from "@react-navigation/native";

const SearchResultsList = ({ OFFResults, USDAResults }) => {
  const areResults = OFFResults.length > 0 || USDAResults.length > 0;

  const navigation = useNavigation()

  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false} onScrollEndDrag={Keyboard.dismiss}>
      <BottomSheetView style={styles.foodListContainer}>
        {USDAResults.map((item) => (
          <View key={item.fdcId}  style={styles.foodListItemContainer}>
            <FoodListItem foodItem={item} />
          </View>
        ))}
        {OFFResults.map((item) => (
          <Pressable key={item.barcode} onPress={() => navigation.navigate('FoodDetails', {barcodeId: item.barcode})} style={styles.foodListItemContainer}>
            <FoodListItem  foodItem={item} />
          </Pressable>
        ))}
      </BottomSheetView>
    </BottomSheetScrollView>
  );
};

export default SearchResultsList;

const styles = StyleSheet.create({
  foodListContainer: {
    borderTopWidth: 1,
    borderTopColor: COLOURS.lightGray,
    marginBottom: 80,
  },
  foodListItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.lightGray,
    paddingVertical: 2,
  },
});
