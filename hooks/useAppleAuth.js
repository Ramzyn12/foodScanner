// hooks/useAppleAuth.js
import {
  signInWithCredential,
  OAuthProvider,
  signOut,
  revokeAccessToken,
} from "firebase/auth";
import * as AppleAuthentication from "expo-apple-authentication";
import { signUpApple } from "../axiosAPI/authAPI";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUserCreatedStatus } from "../redux/authSlice";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";
import { removeUserAccount } from "../axiosAPI/userAPI";

export const useAppleAuth = () => {
  const userInformation = useSelector(
    (state) => state.onboarding.userInformation
  );
  const dispatch = useDispatch();

  const signUpAppleMutation = useMutation({
    mutationFn: signUpApple,
    onSuccess: () => {
      dispatch(setUserCreatedStatus(true));
    },
    onError: (err) => {
      console.log(err, "APPLE Hooks");
      // Need to add an error toast here as wont know why got logged out!
      auth()
        .signOut()
        .then(() => {
          console.log("User signed out cos error signign in to apple");
        })
        .catch((err) => {
          console.log(err, "Error signign out from apple mistkae");
        });
    },
  });

  const removeUserMutation = useMutation({
    mutationFn: removeUserAccount,
    onSuccess: () => {
      console.log("successfully removed accounts");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleAppleLogin = async () => {
    try {
      // Performs the Apple sign-in request
      const appleAuthResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // Check for identity token
      if (!appleAuthResponse.identityToken) {
        throw new Error("Apple Sign-In failed - no identity token returned");
      }

      // Create a Firebase credential
      const { identityToken, nonce } = appleAuthResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce
      );

      // Sign in the user with Firebase
      const userCredential = await auth().signInWithCredential(appleCredential);
      const firebaseToken = await userCredential.user.getIdToken();

      // Store the Firebase token and proceed with any further sign-up process
      await AsyncStorage.setItem("firebaseToken", firebaseToken);

      // Call your backend API or perform further actions with the signed-in user
      signUpAppleMutation.mutate({
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        idToken: identityToken,
        userInformation,
      });
    } catch (error) {
      console.error("Error during Apple sign-in:", error);
      auth().signOut();
    }
  };

  const handleAppleAccountRevoke = async () => {
    // Get an authorizationCode from Apple

    try {
      const { authorizationCode } = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.REFRESH,
      });

      // Ensure Apple returned an authorizationCode
      if (!authorizationCode) {
        throw new Error(
          "Apple Revocation failed - no authorizationCode returned"
        );
      }

      // Revoke the token
      await auth().revokeToken(authorizationCode);

      console.log("Done started other processed");

      if (auth().currentUser) {
        //Show toast saying account deleted?

        const firebaseId = auth().currentUser.uid;

        removeUserMutation.mutate({ firebaseId });

        await auth()
          .currentUser.delete()
          .catch((err) => console.log(err, "1"));

        await AsyncStorage.removeItem("firebaseToken"); // Example of cleaning up
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { handleAppleLogin, signUpAppleMutation, handleAppleAccountRevoke };
};
