import React, { useEffect, useState, useRef } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScanStack from "./navigation/ScanStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./navigation/AuthStack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";

import { setToken } from "./redux/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import MainTabsStack from "./navigation/MainTabsStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import FoodDetails from "./screens/FoodDetails";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainComponent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();


  useEffect(() => {
    // This function runs when the component mounts, and sets up the auth state changed listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.getIdToken().then(async (token) => {
          dispatch(setToken(token));
          await AsyncStorage.setItem('firebaseToken', token); 
          setLoggedIn(true);
          setLoading(false); 
        });
      } else {
        setLoggedIn(false);
        await AsyncStorage.removeItem('firebaseToken'); // Await the removal of the token from AsyncStorage when logged out
        setLoading(false); // Set loading to false when it's confirmed there is no user
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "red" }}>
        <Text>Loading screen</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {loggedIn && (
        <Stack.Navigator
        initialRouteName="MainTabsStack"
        >
          <Stack.Screen
            name="ScanStack"
            options={{ headerShown: false }}
            component={ScanStack}
          />
          <Stack.Screen name="MainTabsStack" options={{headerShown: false}} component={MainTabsStack} />
          <Stack.Screen
            name="FoodDetailsModal"
            options={{ headerShown: false, presentation: 'modal', contentStyle: {borderRadius: 20} }}
            component={FoodDetails}
          />
        </Stack.Navigator>
      )}
      {!loggedIn && <AuthStack />}
    </NavigationContainer>
  );
}

export default MainComponent;
