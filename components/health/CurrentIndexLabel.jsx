import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Animated, { FadeIn, Easing } from "react-native-reanimated";

const CurrentIndexLabel = ({ currentTipIndex, numItems }) => {
  return (
    <Animated.View
      entering={FadeIn.duration(1000).easing(Easing.out(Easing.exp))}
      style={styles.indexLabelContainer}
    >
      <View style={styles.indexLabelTextContainer}>
        <Text style={styles.indexLabelText}>{currentTipIndex} out of {numItems}</Text>
      </View>
    </Animated.View>
  );
};

export default CurrentIndexLabel;

const styles = StyleSheet.create({
  indexLabelContainer: {
    flex: 1,
    justifyContent: "center",
  },
  indexLabelTextContainer: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    // 40 for size of arrow
    marginRight: 40,
    shadowColor: "#000", // Since React Native shadowColor doesn't support alpha, we use black color
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  indexLabelText: { fontSize: 11, fontFamily: "Mulish_700Bold" },
});
