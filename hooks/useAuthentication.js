import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/authSlice";
import { storage } from "../utils/MMKVStorage";

export const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  // const storage = useMMKV()

  useEffect(() => {
    const unsubscribeAuthChange = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        dispatch(setToken(token));
        if (token) storage.set("firebaseToken", token);
        // await AsyncStorage.setItem('firebaseToken', token);
        setIsLoggedIn(true);
      } else {
        // await AsyncStorage.removeItem('firebaseToken');
        storage.delete("firebaseToken");
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

    const tokenChanged = auth().onIdTokenChanged((user) => {
      if (user) {
        user
          .getIdToken(true)
          .then((token) => {
            dispatch(setToken(token));
            storage.set("firebaseToken", token);
          })
          .catch((error) => {
            console.error("Error refreshing token, will sign out now", error);
            auth().signOut()
          });
      }
    });

    return () => {
      unsubscribeAuthChange();
      tokenChanged();
    };
  }, []);

  return { isLoggedIn, isLoading };
};
