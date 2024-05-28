import { View, Text, Keyboard, StyleSheet, Pressable } from "react-native";
import React from "react";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import FoodListItem from "../diary/FoodListItem";
import COLOURS from "../../constants/colours";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const SearchResultsList = ({ DataOFF, DataIvy }) => {
  const navigation = useNavigation();
  const {theme} = useColourTheme()
  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      onScrollEndDrag={Keyboard.dismiss}
      keyboardShouldPersistTaps={"always"}
    >
      <BottomSheetView style={styles.foodListContainer}>
        {DataIvy?.map((item) => (
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate("FoodDetails", { singleFoodId: item._id });
            }}
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
              Keyboard.dismiss();
              navigation.navigate("FoodDetails", { barcodeId: item.barcode });
            }}
            style={[styles.foodListItemContainer, {borderBottomColor: themedColours.stroke[theme]}]}
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
    // borderTopWidth: 2,
    // borderTopColor: "white",
    marginBottom: 80,
  },
  foodListItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.lightGray,
    paddingVertical: 2,
  },
});
