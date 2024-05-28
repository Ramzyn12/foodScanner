import { View, Text, Pressable } from "react-native";
import React from "react";
import AddToBasketIcon from "../../svgs/AddToBasketIcon";
import COLOURS from "../../constants/colours";
import { StyleSheet } from "react-native";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const EmptyGroceries = ({ onPress }) => {
  const {theme} = useColourTheme()
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={[styles.titleText, {color: themedColours.primaryText[theme]}]}>Groceries</Text>
      <View style={[styles.boxContainer, {backgroundColor: themedColours.tertiaryBackground[theme]}]}>
        <AddToBasketIcon color={themedColours.primaryText[theme]} />
        <View style={[styles.boxInnerContainer, {backgroundColor: themedColours.primaryBackground[theme], borderColor: themedColours.stroke[theme]}]}>
          <Text style={[styles.boxText, {color: themedColours.primaryText[theme]}]}>Add your first item</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default EmptyGroceries;

const styles = StyleSheet.create({
  container: { padding: 20, gap: 20, alignItems: "center" },
  titleText: { fontSize: 16, fontFamily: "Mulish_700Bold" },
  boxContainer: {
    padding: 20,
    gap: 20,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    width: "100%",
    borderRadius: 20,
  },
  boxInnerContainer: {
    height: 44,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
    backgroundColor: "#FFF",
    borderRadius: 12,
  },
  boxText: { fontSize: 14, fontFamily: "Mulish_600SemiBold" },
});
