import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/authSlice";
import { storage } from "../utils/MMKVStorage";
import { Log } from "victory-native";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";

export const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [firebaseUid, setFirebaseUid] = useState(null); // Add this line
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  
  const handleSignOut = (message) => {
    storage.delete("firebaseToken");
    setIsLoggedIn(false);
    setFirebaseUid(null);
    if (auth().currentUser) {
      auth().signOut();
      queryClient.clear();
    }
    Toast.show({
      type: "customErrorToast",
      bottomOffset: 45,
      text1: message,
    });
  };

  useEffect(() => {
    const unsubscribeAuthChange = auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          dispatch(setToken(token));
          if (token) storage.set("firebaseToken", token);
          setFirebaseUid(user.uid); // Set Firebase UID
          setIsLoggedIn(true);
        } catch (err) {
          console.log(err, "Error getting user Id token");
          handleSignOut("Failed to authenticate. Please log in again.");
        }
      } else {
        storage.delete("firebaseToken");
        setIsLoggedIn(false);
        console.log("USER NO LONGER FOUND, unsubscribeAuthChange");
        setFirebaseUid(null);
      }
      setIsLoading(false);
    });

    const tokenChanged = auth().onIdTokenChanged(async (user) => {
      if (user) {
        user
          .getIdToken(true)
          .then((token) => {
            dispatch(setToken(token));
            storage.set("firebaseToken", token);
          })
          .catch((error) => {
            console.error("Error refreshing token:", error);
            handleSignOut("Session expired. Please log in again.");
          });
      } else {
        console.log(
          "USER NO LONGER FOUND, tokenChanged function useAuthentication"
        );
      }
    });

    return () => {
      unsubscribeAuthChange();
      tokenChanged();
    };
  }, []);

  return { isLoggedIn, isLoading, firebaseUid };
};
