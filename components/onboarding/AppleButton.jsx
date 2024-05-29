import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useAppleAuth } from "../../hooks/useAppleAuth";
import AppleLogo from "../../svgs/AppleLogo";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const AppleButton = () => {
  const {theme} = useColourTheme()
  const { handleAppleLogin, signUpAppleMutation } = useAppleAuth();

  return (
    <View style={[styles.container, {backgroundColor: theme === 'dark' ? themedColours.primaryText[theme] : 'black'}]}>
      <Pressable onPress={handleAppleLogin} style={styles.innerContainer}>
        <AppleLogo color={themedColours.primaryBackground[theme]} />
        <Text style={[styles.text, {color: themedColours.primaryBackground[theme]}]}>Continue with Apple</Text>
      </Pressable>
    </View>
  );
};

export default AppleButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: "#000",
  },
  innerContainer: {
    width: "100%",
    height: 44,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: "Mulish_600SemiBold",
    color: "#F7F6EF",
  },
});
