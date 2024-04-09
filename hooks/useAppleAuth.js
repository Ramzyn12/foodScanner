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
import { setUserCreatedStatus, setWaitingForBackend } from "../redux/authSlice";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";
import { removeUserAccount } from "../axiosAPI/userAPI";
import Toast from "react-native-toast-message";
import { storage } from "../utils/MMKVStorage";

export const useAppleAuth = () => {
  const userInformation = useSelector(
    (state) => state.onboarding.userInformation
  );
  const dispatch = useDispatch();

  const signUpAppleMutation = useMutation({
    mutationFn: signUpApple,
    onSuccess: () => {
      dispatch(setWaitingForBackend(false));
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
      console.log(err, "Error removing user from mongoDB");
    },
  });

  const handleAppleLogin = async () => {

    dispatch(setWaitingForBackend(true));

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
      // Do we need this? 
      // await AsyncStorage.setItem("firebaseToken", firebaseToken);
      // storage.set('firebaseToken', firebaseToken) 


      // Call your backend API or perform further actions with the signed-in user
      signUpAppleMutation.mutate({
        email: userCredential.additionalUserInfo.profile.email,
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
    try {
      const { authorizationCode, identityToken, nonce } =
        await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.REFRESH,
        });

      // Ensure Apple returned an authorizationCode
      if (!authorizationCode) {
        throw new Error(
          "Apple Revocation failed - no authorizationCode returned"
        );
      }

      if (!identityToken || !nonce) {
        throw new Error(
          "Apple Sign-In failed - no identity token or nonce returned"
        );
      }

      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce
      );

      Toast.show({
        text1: "Account Deleting...",
        autoHide: false,
      });

      await auth().revokeToken(authorizationCode);

      await auth().currentUser.reauthenticateWithCredential(appleCredential);

      if (auth().currentUser) {

        const firebaseId = auth().currentUser.uid;

        removeUserMutation.mutate({ firebaseId });

        await auth()
          .currentUser.delete()
          .catch((err) => console.log(err, "Err deleting user from firebase"));

        Toast.hide();

        // await AsyncStorage.removeItem("firebaseToken"); // Example of cleaning up
        storage.delete('firebaseToken')
      }
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        Toast.show({
          text1: "Please sign in again to confirm account deletion.",
          text2: "For security reasons, a recent login is required.",
          autoHide: true,
          type: "error",
        });
      } else {
        Toast.show({
          text1: "An error occurred",
          text2: "Please try again or contact support if the problem persists.",
          autoHide: true,
          type: "error",
        });
      }
      console.log(err, "Error processing account revocation");
    }
  };

  return { handleAppleLogin, signUpAppleMutation, handleAppleAccountRevoke };
};
