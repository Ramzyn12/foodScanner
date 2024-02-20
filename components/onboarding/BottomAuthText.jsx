import { View, Text, Pressable } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { StyleSheet } from "react-native";
const BottomAuthText = ({ showSignIn, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        {showSignIn ? `Don't have an account yet?` : "Already have an account?"}
      </Text>
      <Pressable onPress={onPress}>
        <Text style={styles.actionText}>
          {showSignIn ? `Sign up` : "Sign in"}
        </Text>
      </Pressable>
    </View>
  );
};

export default BottomAuthText;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
    marginTop: 30,
    flexDirection: "row",
    gap: 3,
    justifyContent: "center",
  },
  questionText: {
    fontFamily: "Mulish_600SemiBold",
    fontSize: 14,
    color: COLOURS.nearBlack,
  },
  actionText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 14,
    color: COLOURS.nearBlack,
  },
});
