// hooks/useAppleAuth.js
import { signInWithCredential, OAuthProvider, signOut } from "firebase/auth";
import * as AppleAuthentication from "expo-apple-authentication";
import { auth } from "../firebaseConfig";
import { signUpApple } from "../axiosAPI/authAPI";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAppleAuth = () => {
  const signUpAppleMutation = useMutation({
    mutationFn: signUpApple,
    onSuccess: () => {},
    onError: (err) => {
      console.log(err, "APPLE");
      signOut(auth)
        .then(() => {
          console.log("User signed out cos error signign in to apple");
        })
        .catch((err) => {
          console.log(err, "Error signign out from apple mistkae");
        });
    },
  });

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { identityToken } = credential;

      if (identityToken) {
        const provider = new OAuthProvider("apple.com");
        provider.addScope("email");
        provider.addScope("name");
        const authCredential = provider.credential({ idToken: identityToken });
        signInWithCredential(auth, authCredential)
          .then(async (userCredential) => {
            // User is signed in
            const user = userCredential.user;
            const token = await user.getIdToken(); // Get Firebase token
            // console.log(token) Worked
            await AsyncStorage.setItem("firebaseToken", token); // Store token
            signUpAppleMutation.mutate({
              email: user.email,
              uid: user.uid,
              idToken: identityToken,
            });
            // Could potentially get operationType to know if first time signing
            // Up or just signing in?
          })
          .catch((error) => {
            console.error("Error during Apple sign in:", error);
          });
      } else {
        console.log("No identity token...");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { handleAppleLogin, signUpAppleMutation };
};
