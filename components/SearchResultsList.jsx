import { View, Text, Keyboard, StyleSheet, Pressable } from "react-native";
import React from "react";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import FoodListItem from "./FoodListItem";
import COLOURS from "../constants/colours";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";

const SearchResultsList = ({ OFFResults, IvyResults }) => {
  const areResults = OFFResults.length > 0 || IvyResults.length > 0;

  const navigation = useNavigation();

  // const IvyMutation = useMutation({
  //   mutationFn: fetchFoodWithIvyId,
  //   onSuccess: (data) => {
  //     console.log(data)
  //   },
  //   onError: (err) => console.log(err)
  // })

  // const handleUSDA = (IvyId) => {
  //   IvyMutation.mutate(IvyId)
  // }

  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      onScrollEndDrag={Keyboard.dismiss}
    >
      <BottomSheetView style={styles.foodListContainer}>
        {IvyResults.map((item) => (
          <Pressable
            onPress={() =>
              navigation.navigate("FoodDetails", { singleFoodId: item._id })
            }
            key={item._id}
            style={styles.foodListItemContainer}
          >
            <FoodListItem foodItem={{ ...item, brand: "Fresh" }} />
          </Pressable>
        ))}
        {OFFResults.map((item) => (
          <Pressable
            key={item.barcode}
            onPress={() =>
              navigation.navigate("FoodDetails", { barcodeId: item.barcode })
            }
            style={styles.foodListItemContainer}
          >
            <FoodListItem foodItem={item} />
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
