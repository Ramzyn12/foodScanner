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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainComponent({ loggedIn }) {
  const dispatch = useDispatch();
  const token = storage.getString("firebaseToken");

  const { data: hapticsEnabledData } = useQuery({
    queryFn: getUserHaptics,
    queryKey: ["HapticsEnabled"],
    enabled: !!token
    // staleTime: Infinity,
    // gcTime: 100000
  });

  useEffect(() => {
    dispatch(setHapticSetting(hapticsEnabledData));
  }, [hapticsEnabledData]);


  const waitingForBackendApple = useSelector(
    (state) => state.auth.waitingForBackend
  );

  useEffect(() => {
    Purchases.addCustomerInfoUpdateListener(info => {
      console.log(info);
      if (info.entitlements.active.pro) {
        console.log("User's pro subscription is active.");
        
      } else {
        console.log("User's pro subscription is not active.");
        // Handle the removal of pro status in your app
      }
    });

    // return () => purchaserInfoUpdateListener.remove();
  }, []);

  return (
    <NavigationContainer>
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
        </Stack.Navigator>
      )}
      {waitingForBackendApple && loggedIn && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "blue",
          }}
        >
          <Text style={{ fontSize: 28 }}>Waiting for backend</Text>
        </View>
      )}
      {!loggedIn && <AuthStack />}
    </NavigationContainer>
  );
}

export default MainComponent;
