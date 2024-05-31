import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import PhotoPhrame from "../../svgs/PhotoPhrame";
import Calender from "../../svgs/Calender";
import AuthDesign from "./AuthDesign";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const AuthState = {
  SIGN_IN: "signIn",
  SIGN_UP_FORM_HIDDEN: "signUpFormHidden",
  SIGN_UP_FORM_SHOWN: "signUpFormShown",
};

const TopUI = ({ authState, keyboardVisible, showAll }) => {
  const translateY = useSharedValue(0);
  const {theme} = useColourTheme()

  useEffect(() => {
    translateY.value = withTiming(keyboardVisible ? -350 : 0, {
      duration: 300,
    });
  }, [keyboardVisible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  

  return (
    // Removed margin -15, didnt seem necessary
    <Animated.View style={[{ flex: 1  }, animatedStyle]}>
      <View style={[styles.topSquare, {backgroundColor: themedColours.tertiaryBackground[theme]}]}>
        {/* If not signIn or signUp then show */}
        {authState === AuthState.SIGN_UP_FORM_HIDDEN && showAll &&  (
          <>
            <PhotoPhrame color={themedColours.primaryText[theme]} />
            <Calender color={themedColours.primaryText[theme]} />
          </>
        )}
      </View>
      <AuthDesign />
    </Animated.View>
  );
};

export default TopUI;

const styles = StyleSheet.create({
  topSquare: {
    width: "100%",
    flex: 1,
    // height: '70%',
    backgroundColor: "#F7F6EF",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
});
