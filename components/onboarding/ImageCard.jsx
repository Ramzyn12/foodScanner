import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ImageCard = ({svg, text}) => {
  return (
    <View style={styles.imageContainer}>
      {svg}
      <Text style={{ fontSize: 14, fontFamily: "Mulish_700Bold" }}>
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
})