import { View, Text, StyleSheet } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { TouchableOpacity } from "react-native";
const RadioButton = ({ value, selectedValue, onSelect }) => {
  return (
    <TouchableOpacity
      style={[
        styles.radioButtonContainer,
        selectedValue === value && styles.radioButtonContainerSelected,
      ]}
      onPress={() => onSelect(value)}
    >
      <View style={styles.radioButton}>
        {selectedValue === value && (
          <View style={styles.radioButtonSelected}></View>
        )}
      </View>
      <Text style={styles.radioButtonText}>{value}</Text>
    </TouchableOpacity>
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
