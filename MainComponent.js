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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import FoodDetails from "./screens/FoodDetails";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainComponent({ loggedIn }) {

  const waitingForBackendApple = useSelector((state) => state.auth.waitingForBackend);

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
