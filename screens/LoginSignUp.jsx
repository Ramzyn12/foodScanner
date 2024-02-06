import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import {
  OAuthProvider,
  signInWithCredential,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { signUp, signUpApple } from "../axiosAPI/authAPI";
import { useMutation } from "@tanstack/react-query";
import * as AppleAuthentication from "expo-apple-authentication";
import { useAppleAuth } from "../hooks/useAppleAuth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleAppleLogin, signUpAppleMutation } = useAppleAuth();

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: async (data) => {
      if (data?.token) {
        await AsyncStorage.setItem("firebaseToken", data.token);
      } 
    },
    onError: (err) => {},
  });

  const handleLogin = () => {
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

  const handleSignUp = () => {
    signUpMutation.mutate({ email, password });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {signUpMutation.isPending && <Text>singing in....</Text>}
      {signUpAppleMutation.isPending && <Text>singing apple in....</Text>}
      <Text style={styles.title}>Login/SignUp</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 44 }}
        onPress={handleAppleLogin}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 40,

  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 20,
  },
});

export default LoginSignUp;
