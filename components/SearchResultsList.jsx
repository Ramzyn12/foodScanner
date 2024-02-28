import { View, Text, Keyboard, StyleSheet, Pressable } from "react-native";
import React from "react";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import FoodListItem from "./FoodListItem";
import COLOURS from "../constants/colours";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";

const SearchResultsList = ({ DataOFF, DataIvy }) => {
  // const areResults = OFFResults.length > 0 || IvyResults.length > 0;

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
      keyboardShouldPersistTaps={'always'}
    >
      <BottomSheetView style={styles.foodListContainer}>
        {/* CHANGE TO FLATLIST IF EXPECTING MORE ITEMS */}
        {DataIvy?.map((item) => (
          <Pressable
            onPress={() => {
              Keyboard.dismiss()
              navigation.navigate("FoodDetails", { singleFoodId: item._id })
            }
            }
            key={item._id}
            style={styles.foodListItemContainer}
          >
            <FoodListItem foodItem={{ ...item, brand: "Fresh" }} />
          </Pressable>
        ))}
        {DataOFF?.map((item) => (
          <Pressable
            key={item.barcode}
            onPress={() => {
              Keyboard.dismiss()
              navigation.navigate("FoodDetails", { barcodeId: item.barcode })
            }
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
    borderTopWidth: 2,
    borderTopColor: 'white',
    marginBottom: 80,
  },
  foodListItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.lightGray,
    paddingVertical: 2,
  },
});
