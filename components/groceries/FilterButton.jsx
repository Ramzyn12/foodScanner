import { View, Text, Pressable } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";
import { StyleSheet } from "react-native";
import DropdownIcon from "../../svgs/DropdownIcon";
import FilterIcon from "../../svgs/FilterIcon";

const FilterButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <FilterIcon />
      <Text style={styles.buttonText}>Filter</Text>
      <DropdownIcon />
    </Pressable>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  container: {
    height: 36,
    paddingHorizontal: 15,
    gap: 8,
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Mulish_600SemiBold",
    color: COLOURS.nearBlack,
  },
});
