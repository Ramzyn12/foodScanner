import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { Path, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import PlusIcon from "../../svgs/PlusIcon";

const TopActions = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.editText}>Edit</Text>
      <Text style={styles.titleText}>Groceries</Text>
      <Pressable onPress={() => navigation.navigate("ScanStack")}>
       <PlusIcon />
      </Pressable>
    </View>
  );
};

export default TopActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  editText: {
    color: COLOURS.darkGreen,
    fontSize: 14,
    fontFamily: "Mulish_600SemiBold",
  },
  titleText: {
    color: COLOURS.nearBlack,
    fontSize: 16,
    fontFamily: "Mulish_700Bold",
  },
});
