import { View, Text, Keyboard, StyleSheet, Pressable } from "react-native";
import React, { useCallback, useMemo } from "react";
import {
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import FoodListItem from "../diary/FoodListItem";
import COLOURS from "../../constants/colours";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const SearchResultsList = ({ DataOFF, DataIvy }) => {
  const navigation = useNavigation();
  const { theme } = useColourTheme();

  const handlePress = useCallback(
    (item, isIvy) => {
      Keyboard.dismiss();
      navigation.navigate("FoodDetails", {
        singleFoodId: isIvy ? item._id : undefined,
        barcodeId: isIvy ? undefined : item.barcode,
      });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item, isIvy }) => (
      <Pressable
        onPress={() => handlePress(item, isIvy)}
        key={isIvy ? item._id : item.barcode}
        style={[
          styles.foodListItemContainer,
          { borderBottomColor: themedColours.stroke[theme] },
        ]}
      >
        <FoodListItem foodItem={isIvy ? { ...item, brand: "Fresh" } : item} />
      </Pressable>
    ),
    [handlePress, theme]
  );

  const mergedData = useMemo(
    () => [
      ...DataIvy.map((item) => ({ ...item, isIvy: true })),
      ...DataOFF.map((item) => ({ ...item, isIvy: false })),
    ],
    [DataIvy, DataOFF]
  );

  return (
    <BottomSheetFlatList
      data={mergedData}
      keyExtractor={(item) => item._id || item.barcode}
      renderItem={({ item }) => renderItem({ item, isIvy: item.isIvy })}
      showsVerticalScrollIndicator={false}
      onScrollEndDrag={Keyboard.dismiss}
      keyboardShouldPersistTaps={"always"}
      contentContainerStyle={styles.foodListContainer}
    />
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
