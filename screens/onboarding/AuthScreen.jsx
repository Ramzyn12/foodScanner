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
import { useSelector } from "react-redux";
import { useKeyboardVisible } from "../../hooks/useKeyboardVisible";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const AuthState = {
  SIGN_IN: "signIn",
  SIGN_UP_FORM_HIDDEN: "signUpFormHidden",
  SIGN_UP_FORM_SHOWN: "signUpFormShown",
};

const AuthScreen = ({ route, navigation }) => {
  const authType = route?.params?.authType;
  const [authState, setAuthState] = useState(AuthState.SIGN_UP_FORM_HIDDEN);
  const keyboardVisible = useKeyboardVisible();
  const userInformation = useSelector(
    (state) => state.onboarding.userInformation
  );
  const {theme} = useColourTheme()

  useLayoutEffect(() => {
    if (authType === "Log In") setAuthState(AuthState.SIGN_IN);
  }, []);

  const handleAuthTypePress = () => {
    // If tried to go to sign up page when not filled in onboarding
    if (!userInformation.gender && AuthState.SIGN_IN) {
      navigation.navigate("Welcome");
    } else {
      setAuthState((prevState) =>
        prevState === AuthState.SIGN_IN
          ? AuthState.SIGN_UP_FORM_HIDDEN
          : AuthState.SIGN_IN
      );
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: themedColours.primaryBackground[theme]}]}>

      {/* Design at top of page */}
      <TopUI authState={authState} keyboardVisible={keyboardVisible} />

      <KeyboardAvoidingView
        behavior="padding"
        style={{ paddingTop: keyboardVisible ? 50 : 25 }}
      >

        {/* Main Title */}
        <View style={styles.writingContainer}>
          <Text style={[styles.titleText, {color: themedColours.primaryText[theme]}]}>
            {authState === AuthState.SIGN_IN
              ? "Welcome back. Sign in to Ivy."
              : "Sign up to begin changing your life."}
          </Text>
        </View>

        {/* Buttons */}
        <View
          style={[
            styles.buttonsContainer,
            // DO i need the below styles? or just one value
            {
              marginTop:
                authState === AuthState.SIGN_IN ||
                authState === AuthState.SIGN_UP_FORM_SHOWN
                  ? 15
                  : 30,
            },
          ]}
        >
          <AppleButton />
          {authState === AuthState.SIGN_UP_FORM_HIDDEN && (
            <EmailButton
              onPress={() => setAuthState(AuthState.SIGN_UP_FORM_SHOWN)}
            />
          )}
        </View>

        {/* Forms depending on auth type */}
        {authState === AuthState.SIGN_IN && <SignInForm />}
        {authState === AuthState.SIGN_UP_FORM_SHOWN && <SignUpForm />}

        {/* Change Auth Type Text */}
        <BottomAuthText authState={authState} onPress={handleAuthTypePress} />

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
