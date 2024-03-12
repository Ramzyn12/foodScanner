import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useAppleAuth } from "../../hooks/useAppleAuth";
import AppleLogo from "../../svgs/AppleLogo";

const AppleButton = () => {
  
  const { handleAppleLogin, signUpAppleMutation } = useAppleAuth();

  return (
    <View style={styles.container}>
      <Pressable onPress={handleAppleLogin} style={styles.innerContainer}>
        <AppleLogo />
        <Text style={styles.text}>Continue with Apple</Text>
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
