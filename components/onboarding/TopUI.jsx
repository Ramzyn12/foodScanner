import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PhotoPhrame from "../../svgs/PhotoPhrame";
import Calender from "../../svgs/Calender";
import AuthDesign from "./AuthDesign";

const TopUI = ({showSignIn, showSignUpForm}) => {
  return (
    <View style={{ flex: 1, marginBottom: -15 }}>
      <View style={styles.topSquare}>
        {/* If not signIn nor signUp then show */}
        {!showSignIn && !showSignUpForm && (
          <>
            <PhotoPhrame />
            <Calender />
          </>
        )}
      </View>
      <AuthDesign />
    </View>
  );
};

export default TopUI;

const styles = StyleSheet.create({
  topSquare: {
    width: "100%",
    flex: 1,
    backgroundColor: "#F7F6EF",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
});