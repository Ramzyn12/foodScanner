import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";
import { StyleSheet } from "react-native";
import ShareIcon from "../../svgs/ShareIcon";

const ShareList = () => {
  return (
    <View style={styles.container}>
      <ShareIcon />
      <Text style={styles.buttonText}>Share List</Text>
    </View>
  );
};

export default ShareList;

const styles = StyleSheet.create({
  container: {
    height: 36,
    paddingHorizontal: 15,
    gap: 8,
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Mulish_600SemiBold",
    color: COLOURS.nearBlack,
  },
});
