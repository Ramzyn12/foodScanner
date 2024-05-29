import { View, Text, StyleSheet } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { Pressable } from "react-native";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";
const RadioButton = ({ value, selectedValue, onSelect }) => {
  const {theme} = useColourTheme()

  return (
    <Pressable
      style={[
        [styles.radioButtonContainer, {borderColor: themedColours.stroke[theme]}],
        selectedValue === value && [styles.radioButtonContainerSelected, {borderColor: themedColours.primary[theme]}],
      ]}
      onPress={() => onSelect(value)}
    >
      <View style={[styles.radioButton, {backgroundColor: themedColours.tertiaryBackground[theme]}]}>
        {selectedValue === value && (
          <View style={[styles.radioButtonSelected, {backgroundColor: themedColours.primary[theme]}]}></View>
        )}
      </View>
      <Text style={[styles.radioButtonText, {color: themedColours.primaryText[theme]}]}>{value}</Text>
    </Pressable>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioButtonContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 20,
  },
  radioButtonContainerSelected: {
    borderWidth: 2,
    paddingHorizontal: 11,
    marginVertical: -1,
    borderColor: COLOURS.darkGreen,
  },
  radioButton: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: "#F7F6EF",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: COLOURS.darkGreen,
  },
  radioButtonText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 16,
    color: COLOURS.nearBlack,
  },
});
