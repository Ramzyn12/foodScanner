import { View, Text, Pressable } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { StyleSheet } from "react-native";
import ShareIcon from "../../svgs/ShareIcon";
import { useSelector } from "react-redux";
import Share from "react-native-share"; // Step 1: Import Share from react-native-share
import Toast from "react-native-toast-message";

const ShareList = () => {
  const currentGroceries = useSelector(
    (state) => state.grocery.currentGroceries
  );

  const shareGroceries = async () => {
    const bulletPoint = "\u2022"; // Unicode character for a bullet point
    const itemsString = currentGroceries
      .map((item) => `${bulletPoint} ${item.item.name}`) // Prefix each item with a bullet point
      .join("\n");

    const footer = `\n\nShared Via Ivy - Quit Processed Food App\nexp+ivy://expo-development-client/?url=http%3A%2F%2F192.168.0.145%3A8081`;

    const message = `My Grocery List:\n\n${itemsString}${footer}`;

    try {
      await Share.open({
        message,
      });
    } catch (error) {
      if (error.message === "User did not share") {
        return;
      } else {
        Toast.show({
          type: "customErrorToast",
          text1: "Failed to share, please try again later",
        });
      }
    }
  };

  return (
    <Pressable style={styles.container} onPress={shareGroceries}>
      <ShareIcon />
      <Text style={styles.buttonText}>Share List</Text>
    </Pressable>
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
