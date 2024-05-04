import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/authSlice";
import { storage } from "../utils/MMKVStorage";
import { Log } from "victory-native";

export const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [firebaseUid, setFirebaseUid] = useState(null);  // Add this line
  const dispatch = useDispatch();
  // const storage = useMMKV()

  useEffect(() => {
    const unsubscribeAuthChange = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        dispatch(setToken(token));
        if (token) storage.set("firebaseToken", token);
        setFirebaseUid(user.uid);  // Set Firebase UID
        setIsLoggedIn(true);
      } else {
        setFirebaseUid(null);  // Reset Firebase UID
        storage.delete("firebaseToken");
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

    const tokenChanged = auth().onIdTokenChanged(async (user) => {
      // const result = await user.getIdTokenResult();
      // const expiresIn = result.expirationTime;
      // const timeNow = new Date();
      // const timeLeft = new Date(expiresIn) - timeNow;
      // console.log(
      //   `Time left until token expires: ${timeLeft / 1000 / 60} minutes`
      // );
      if (user) {
        user
          .getIdToken(true)
          .then((token) => {
            dispatch(setToken(token));
            storage.set("firebaseToken", token);
          })
          .catch((error) => {
            console.error("Error refreshing token, will sign out now", error);
            auth().signOut();
          });
      }
    });

    return () => {
      unsubscribeAuthChange();
      tokenChanged();
    };
  }, []);

  return { isLoggedIn, isLoading, firebaseUid };
};
