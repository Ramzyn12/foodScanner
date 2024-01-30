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

const LoginSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {},
    onError: (err) => {},
  });

  const { handleAppleLogin, signUpAppleMutation } = useAppleAuth();


  // const signUpAppleMutation = useMutation({
  //   mutationFn: signUpApple,
  //   onSuccess: () => {},
  //   onError: (err) => {
  //     console.log(err, 'APPLE');
  //     signOut(auth)
  //       .then(() => {
  //         console.log("User signed out cos error signign in to apple");
  //       })
  //       .catch((err) => {
  //         console.log(err, "Error signign out from apple mistkae");
  //       });
  //   },
  // });

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
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

  // const handleAppleLogin = async () => {
  //   try {
  //     const credential = await AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //       ],
  //     });

  //     const { identityToken } = credential;

  //     if (identityToken) {
  //       const provider = new OAuthProvider("apple.com");
  //       provider.addScope("email");
  //       provider.addScope("name");
  //       const authCredential = provider.credential({ idToken: identityToken });
  //       // console.log(authCredential, "AUTH CRED");
  //       signInWithCredential(auth, authCredential)
  //         .then((userCredential) => {
  //           // User is signed in
  //           console.log(userCredential, "USER CRED");
  //           const user = userCredential.user;

  //           signUpAppleMutation.mutate({
  //             email: user.email,
  //             uid: user.uid,
  //             idToken: identityToken,
  //           });
  //           // COuld potentially get operationType to know if first time signing
  //           //Up or just signing in?
  //         })
  //         .catch((error) => {
  //           console.error("Error during Apple sign in:", error);
  //         });
  //     } else {
  //       console.log("No identity token...");
  //     }
  //   } catch (e) {
  //     if (e.code === "ERR_REQUEST_CANCELED") {
  //       console.log(e);
  //     } else {
  //       console.log(e);
  //     }
  //   }
  // };

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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
