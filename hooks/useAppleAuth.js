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
import { useNavigation } from "@react-navigation/native";

const handleErrorSigningIn = (err) => {
  if (auth().currentUser) {
    auth()
      .signOut()
      .catch((err) => {
        console.log(err, "Unable to sign out from apple");
      });
  }
  if (err.code === "1001") {
    return;
  }
  Toast.show({
    type: "customErrorToast",
    bottomOffset: 45,
    text1: "Error signing into apple, Please try again later",
  });
};

export const useAppleAuth = () => {
  const userInformation = useSelector(
    (state) => state.onboarding.userInformation
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const signUpAppleMutation = useMutation({
    mutationFn: signUpApple,
    onSuccess: () => {
      // Once user is created we can call things like diary days
      dispatch(setWaitingForBackend(false));
    },
    onError: (err) => {
      console.log("Error in signUpApple");
      // console.log(err.response.data, "Error in signUpAppleMutation"); //Can remove in prod
      handleErrorSigningIn(err);
      dispatch(setWaitingForBackend(false));
    },
  });

  const removeUserMutation = useMutation({
    mutationFn: removeUserAccount,
    onSuccess: () => {
      console.log("successfully removed accounts");
    },
    onError: (err) => {
      console.log(err, "Error removing user mutation");
      Toast.show({
        type: "customErrorToast",
        bottomOffset: 45,
        text1: "Error deleting account, Please contact customer support",
      });
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

      // const firebaseToken = await userCredential.user.getIdToken();
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
      console.log(error);
      handleErrorSigningIn(error);
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

      // Nicer toast
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
        storage.delete("firebaseToken");
      }
    } catch (err) {
      if (err.code !== "1001") {
        Toast.show({
          type: "customErrorToast",
          bottomOffset: 45,
          text1: "Error deleting account, Please contact customer support",
        });
      }
    }
  };

  return { handleAppleLogin, signUpAppleMutation, handleAppleAccountRevoke };
};
