import "@expo/metro-runtime";
import "react-native-gesture-handler";
import "react-native-get-random-values";
import React, { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import MainComponent from "./MainComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
  Mulish_800ExtraBold,
} from "@expo-google-fonts/mulish";
import { toastConfig } from "./toastConfig";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { useAuthentication } from "./hooks/useAuthentication";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Purchases from "react-native-purchases";
import { Platform } from "react-native";
import { useNotifications } from "./hooks/useNotifications";
import { ThemeProvider } from "./context/Themed";

SplashScreen.preventAutoHideAsync(); // Prevent auto-hide

// MAY NEED TO CHANGE STALE TIME?
const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          {/* Only necessary if want to use redux in App, else remove. */}
          <AppInitializer />
        </Provider>
        <Toast position="bottom" bottomOffset={95} config={toastConfig} />
      </QueryClientProvider>
    </>
  );
};

const AppInitializer = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isLoggedIn, isLoading, firebaseUid } = useAuthentication();
  const RC_API_KEY = process.env.EXPO_PUBLIC_RC_IOS_KEY;

  let [fontsLoaded] = useFonts({
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold,
    Mulish_800ExtraBold,
    Lato_400Regular,
    Lato_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      setAppIsReady(true);
    }
  }, [fontsLoaded, isLoading]);

  useEffect(() => {

    if (Platform.OS === "ios" && RC_API_KEY && firebaseUid) {
      console.log(RC_API_KEY, firebaseUid);

      // USE THIS ONE AGAIN, Was just testing
      // Remove usesStoreKit2...
      Purchases.configure({
        apiKey: RC_API_KEY,
        appUserID: firebaseUid,
        usesStoreKit2IfAvailable: true, // REMOVE THIS BEFORE PRODUCTION
      });
      // Purchases.configure({ apiKey: RC_API_KEY });
    } 
  }, [firebaseUid, RC_API_KEY]);

  useNotifications();

  // console.log(notification, 'Notification', expoPushToken);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <GestureHandlerRootView
            onLayout={onLayoutRootView}
            style={{ flex: 1 }}
          >
            <BottomSheetModalProvider>
              <MainComponent loggedIn={isLoggedIn} />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
