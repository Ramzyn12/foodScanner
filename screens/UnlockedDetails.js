import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import TipList from "../components/health/TipList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

const UnlockedDetails = () => {
  const insets = useSafeAreaInsets();
  const [backgroundFill, setBackgroundFill] = useState("#FFF");

  const handleBackgroundChange = (ind) => {
    if (ind > 0) {
      setBackgroundFill("#F7F6EF");
    } else {
      setBackgroundFill("#FFF");
    }
  };

  return (
    <View
      style={{
        backgroundColor: backgroundFill,
        // paddingHorizontal: 20,
        paddingTop: insets.top,
        flex: 1,
      }}
    >
      {/* <View style={{width: '100%', height: 200}}></View> */}
      <TipList onSlideChange={handleBackgroundChange} />
    </View>
  );
};

export default UnlockedDetails;
