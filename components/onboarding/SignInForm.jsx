import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import COLOURS from "../../constants/colours";
import { StyleSheet } from "react-native";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import FormSubmissionButton from "./FormSubmissionButton";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth'
import { storage } from "../../utils/MMKVStorage";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signInLoading, setSignInLoading] = useState(false)

  const handleFirebaseError = (code) => {
    let message;

    switch (code) {
      case "auth/invalid-email":
      case "auth/user-disabled":
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        message = "Invalid email or password. Please try again.";
        break;
      case "auth/too-many-requests":
        message = "Too many attempts. Please try again later.";
        break;
      case "auth/network-request-failed":
        message = "Network error. Please check your connection and try again.";
        break;
      default:
        message = "An unexpected error occurred. Please try again.";
    }

    setErrorMessage(message);
  };

  const handleSignIn = () => {
    setSignInLoading(true)
    auth().signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken();
        // await AsyncStorage.setItem("firebaseToken", token);
        storage.set('firebaseToken', token) 
        setSignInLoading(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        handleFirebaseError(errorCode);
        setSignInLoading(false)
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {errorMessage && <Text>{errorMessage}</Text>}
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        <FormSubmissionButton
          email={email}
          password={password}
          isLoading={signInLoading}
          text={"Sign In"}
          onPress={handleSignIn}
        />
      </View>
    </View>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  formContainer: {
    gap: 12,
    paddingHorizontal: 25,
  },
  container: {
    paddingTop: 30,
    marginTop: 30,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLOURS.lightGray,
  },
});
