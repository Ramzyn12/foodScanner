// App.js
import "react-native-gesture-handler";
import "react-native-get-random-values";
import React, { useMemo } from "react";
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
} from "@expo-google-fonts/mulish";
import COLOURS from './constants/colours'

import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import Toast, { BaseToast } from "react-native-toast-message";
import { Pressable, Text } from "react-native";

const App = () => {
  let [fontsLoaded] = useFonts({
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold,
    Lato_400Regular,
    Lato_700Bold,
  });

  const toastConfig = useMemo(() => ({
    groceryToast: ({ text1, text2, props }) => (
      <Pressable onPress={() => props.onUndo()} style={{ height: 44, width: '90%', backgroundColor: COLOURS.nearBlack, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <Text style={{color: 'white', fontFamily: 'Mulish_500Medium', fontSize: 14}}>{text1}</Text>
        <Text style={{color: 'white', fontFamily: 'Mulish_600SemiBold', fontSize: 14}}>{text2}</Text>
      </Pressable>
    ),
    foodDetailToast: ({ text1, text2, onViewPress, props }) => (
      <Pressable onPress={onViewPress} style={{ height: 44, width: '90%', backgroundColor: COLOURS.nearBlack, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <Text style={{color: 'white', fontFamily: 'Mulish_500Medium', fontSize: 14}}>{text1}</Text>
        <Text style={{color: 'white', fontFamily: 'Mulish_600SemiBold', fontSize: 14}}>{text2}</Text>
      </Pressable>
    )
  }), []); 


  if (!fontsLoaded) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <MainComponent />
          </GestureHandlerRootView>
        </Provider>
      </QueryClientProvider>
      <Toast position="bottom" bottomOffset={95} config={toastConfig} />
    </>
  );
};

export default App;
