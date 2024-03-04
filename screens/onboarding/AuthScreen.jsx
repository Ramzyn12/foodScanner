import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AuthDesign from "../../components/onboarding/AuthDesign";
import PhotoPhrame from "../../svgs/PhotoPhrame";
import Calender from "../../svgs/Calender";
import COLOURS from "../../constants/colours";
import * as AppleAuthentication from "expo-apple-authentication";
import { Path, Svg } from "react-native-svg";
import { useAppleAuth } from "../../hooks/useAppleAuth";
import AppleLogo from "../../svgs/AppleLogo";
import AppleButton from "../../components/onboarding/AppleButton";
import EmailButton from "../../components/onboarding/EmailButton";
import SignInForm from "../../components/onboarding/SignInForm";
import { KeyboardAvoidingView } from "react-native";
import SignUpForm from "../../components/onboarding/SignUpForm";
import TopUI from "../../components/onboarding/TopUI";
import BottomAuthText from "../../components/onboarding/BottomAuthText";

const AuthScreen = ({ route }) => {
  //Look at route and if sign in, setshowsignin true to begin with
  const authType = route?.params?.authType;
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useLayoutEffect(() => {
    if (authType === "Log In") setShowSignIn(true);
  }, []);

  useLayoutEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => setKeyboardVisible(false)
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleAuthTypePress = () => {
    setShowSignIn((curr) => !curr);
    setShowSignUpForm(false);
  };

  return (
    <View style={styles.container}>
      {/* Top of screen UI */}
      {!keyboardVisible && (
        <TopUI showSignIn={showSignIn} showSignUpForm={showSignUpForm} />
      )}
      <KeyboardAvoidingView
        behavior="padding"
        style={{ paddingTop: keyboardVisible ? 50 : 25 }}
      >
        {/* Writing */}
        <View style={styles.writingContainer}>
          <Text style={styles.titleText}>
            {showSignIn
              ? "Welcome back. Sign in to Ivy."
              : "Sign up to begin changing your life."}
          </Text>
        </View>
        {/* Buttons */}
        <View
          style={[
            styles.buttonsContainer,
            { marginTop: showSignIn || showSignUpForm ? 15 : 30 },
          ]}
        >
          <AppleButton />
          {!showSignIn && !showSignUpForm && (
            <EmailButton onPress={() => setShowSignUpForm(true)} />
          )}
        </View>
        {/* If we're signed in and the sign up form is cancelled show sign in form */}
        {showSignIn && !showSignUpForm && <SignInForm />}
        {showSignUpForm && !showSignIn && <SignUpForm />}
        <BottomAuthText showSignIn={showSignIn} onPress={handleAuthTypePress} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    gap: 40,
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: "center",
  },
  topSquare: {
    width: "100%",
    flex: 1,
    backgroundColor: "#F7F6EF",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
  writingContainer: { paddingVertical: 10, paddingHorizontal: 75, gap: 15 },
  titleText: {
    fontFamily: "Mulish_700Bold",
    fontSize: 28,
    color: COLOURS.nearBlack,
    textAlign: "center",
  },
  buttonsContainer: {
    gap: 12,
    paddingHorizontal: 25,
  },
});
