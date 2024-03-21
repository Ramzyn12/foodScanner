import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import COLOURS from '../../constants/colours'
import PlusIcon from "../../svgs/PlusIcon";

const AddFoodButton = () => {

  const navigation = useNavigation();


  const handleFoodPress = () => {
    navigation.navigate("ScanStack");
  };


  return (
    <View style={{ paddingBottom: 14, paddingTop: 28 }}>
      <Pressable onPress={handleFoodPress} style={styles.addFoodButton}>
        <PlusIcon size={13} />
        <Text style={styles.addFoodButtonText}>Add more food</Text>
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
    borderColor: COLOURS.lightGray,
    borderWidth: 1,
    borderRadius: 12,
    gap: 12,
    height: 44
  },
  addFoodButtonText: {
    fontSize: 14,
    fontFamily: "Mulish_700Bold",
    color: COLOURS.nearBlack
  },
});
