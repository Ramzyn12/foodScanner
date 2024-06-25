import React, { useEffect, useState, useRef } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScanStack from "./navigation/ScanStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./navigation/AuthStack";
import { onAuthStateChanged } from "firebase/auth";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MainTabsStack from "./navigation/MainTabsStack";

import FoodDetails from "./screens/FoodDetails";
import { useQuery } from "@tanstack/react-query";
import { getUserHaptics } from "./axiosAPI/userAPI";
import { setHapticSetting } from "./redux/userSlice";
import { storage } from "./utils/MMKVStorage";
import Purchases from "react-native-purchases";
import LoadingDiary from "./components/diary/LoadingDiary";
import Toast from "react-native-toast-message";
import { toastConfig } from "./toastConfig";
import { themedColours } from "./constants/themedColours";
import { useColourTheme } from "./context/Themed";
import Paywall from "./screens/Paywall";
import Disclaimer from "./screens/Disclaimer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const getHapticsPreference = async () => {
  try {
    const value = await AsyncStorage.getItem("hapticsPreference");
    if (value !== null) {
      return JSON.parse(value);
    }
    return false; // default value
  } catch (error) {
    console.error("Failed to fetch the haptics preference from storage", error);
    return false;
  }
};

function MainComponent({ loggedIn }) {
  const dispatch = useDispatch();
  const token = storage.getString("firebaseToken");
  const waitingForBackendApple = useSelector(
    (state) => state.auth.waitingForBackend
  );
  const {theme} = useColourTheme()

  console.log(waitingForBackendApple, 'BACKEND APPLE LOADING');

  useEffect(() => {
    const fetchHapticsPreference = async () => {
      const storedPreference = await getHapticsPreference();
      dispatch(setHapticSetting(storedPreference));
    };
    fetchHapticsPreference();
  }, []);


  return (
    <NavigationContainer theme={{colors: {
      background: themedColours.primaryBackground[theme]
    }}}>
      {loggedIn && !waitingForBackendApple && (
        <Stack.Navigator initialRouteName="MainTabsStack">
          <Stack.Screen
            name="ScanStack"
            options={{ headerShown: false }}
            component={ScanStack}
          />
          <Stack.Screen
            name="MainTabsStack"
            options={{ headerShown: false }}
            component={MainTabsStack}
          />
          <Stack.Screen
            name="FoodDetailsModal"
            options={{
              headerShown: false,
              presentation: "modal",
              contentStyle: { borderRadius: 20 },
            }}
            component={FoodDetails}
          />
          <Stack.Screen
            name="Disclaimer"
            options={{
              headerShown: false,
              presentation: "modal",
              contentStyle: { borderRadius: 20 },
            }}
            component={Disclaimer}
          />
          <Stack.Screen
            name="Paywall"
            component={Paywall}
            options={{
              headerShown: false,
              presentation: 'modal'
            }}
          />
        </Stack.Navigator>
      )}
      {waitingForBackendApple && loggedIn && (
        <LoadingDiary />
      )}
      {!loggedIn && <AuthStack />}
    </NavigationContainer>
  );
}

export default MainComponent;
