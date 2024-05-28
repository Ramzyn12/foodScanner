import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { Path, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import PlusIcon from "../../svgs/PlusIcon";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const TopActions = () => {
  const navigation = useNavigation();
  const {theme} = useColourTheme()
  return (
    <View style={styles.container}>
      <Pressable >
        <Text style={styles.editText}>Edit</Text>
      </Pressable>
      <Text style={[styles.titleText, {color: themedColours.primaryText[theme]}]}>Groceries</Text>
      <Pressable
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        onPress={() => navigation.navigate("ScanStack")}
      >
        <PlusIcon colour={themedColours.primaryText[theme]} />
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
    color: 'transparent',
    fontSize: 14,
    fontFamily: "Mulish_600SemiBold",
  },
  titleText: {
    color: COLOURS.nearBlack,
    fontSize: 16,
    fontFamily: "Mulish_700Bold",
  },
});
