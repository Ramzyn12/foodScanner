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
import { auth } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken();
        await AsyncStorage.setItem("firebaseToken", token);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        <FormSubmissionButton
          email={email}
          password={password}
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
