import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import COLOURS from '../constants/colours'

const AddFoodButton = () => {
  const navigation = useNavigation();

  const handleFoodPress = () => {
    navigation.navigate("ScanStack");
  };

  return (
    <View style={{ paddingVertical: 15 }}>
      <Pressable onPress={handleFoodPress} style={styles.addFoodButton}>
        {/* Plus sign aligned to the left */}
        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <Path
            d="M9.75 1C9.75 0.585786 9.41421 0.25 9 0.25C8.58579 0.25 8.25 0.585786 8.25 1L8.25 8.25H1C0.585786 8.25 0.25 8.58579 0.25 9C0.25 9.41421 0.585786 9.75 1 9.75H8.25V17C8.25 17.4142 8.58579 17.75 9 17.75C9.41421 17.75 9.75 17.4142 9.75 17V9.75H17C17.4142 9.75 17.75 9.41421 17.75 9C17.75 8.58579 17.4142 8.25 17 8.25H9.75L9.75 1Z"
            fill={COLOURS.nearBlack}
          />
        </Svg>
        {/* Add more food text in the center with flex: 1 */}
        <Text style={styles.addFoodButtonText}>Add more food</Text>
        {/* Empty text to balance the space and keep the plus sign on the left */}
      </Pressable>
    </View>
  );
};

export default AddFoodButton;

const styles = StyleSheet.create({
  addFoodButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center children horizontally
    borderColor: COLOURS.lightGray,
    borderWidth: 1,
    borderRadius: 30,
    gap: 12,
  },
  addFoodButtonText: {
    fontSize: 16,
    fontFamily: "Mulish_600SemiBold",
    color: COLOURS.nearBlack
  },
});
