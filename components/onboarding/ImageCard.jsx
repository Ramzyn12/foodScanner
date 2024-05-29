import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

// The Image Card for the Info screen on onboarding
const ImageCard = ({svg, text}) => {
  const {theme} = useColourTheme()
  return (
    <View style={styles.imageContainer}>
      {svg}
      <Text style={[styles.labelText, {color: themedColours.primaryText[theme]}]}>
        {text}
      </Text>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  labelText: { fontSize: 14, fontFamily: "Mulish_700Bold" }
})