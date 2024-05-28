import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import COLOURS from "../../constants/colours";
import PlusIcon from "../../svgs/PlusIcon";
import { themedColours } from "../../constants/themedColours";
import { useColourTheme } from "../../context/Themed";

const AddFoodButton = () => {
  const { theme } = useColourTheme();
  const navigation = useNavigation();
  const handleFoodPress = () => {
    navigation.navigate("ScanStack");
  };

  return (
    <View style={{ paddingBottom: 14, paddingTop: 28 }}>
      <Pressable
        onPress={handleFoodPress}
        style={[
          styles.addFoodButton,
          { borderColor: themedColours.stroke[theme] },
        ]}
      >
        <PlusIcon colour={themedColours.primaryText[theme]} size={13} />
        <Text
          style={[
            styles.addFoodButtonText,
            { color: themedColours.primaryText[theme] },
          ]}
        >
          Add more food
        </Text>
      </Pressable>
    </View>
  );
};

export default AddFoodButton;

const styles = StyleSheet.create({
  addFoodButton: {
    // paddingHorizontal: 20,
    // paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center children horizontally
    borderWidth: 1,
    borderRadius: 12,
    gap: 12,
    height: 44,
  },
  addFoodButtonText: {
    fontSize: 14,
    fontFamily: "Mulish_700Bold",
    color: COLOURS.nearBlack,
  },
});
