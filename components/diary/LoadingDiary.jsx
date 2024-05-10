import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";


const LoadingDiary = () => {

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
        // paddingTop: insets.top + 20,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: 140,
          height: 42,
          borderRadius: 20,
          backgroundColor: "#F5F5F5",
        }}
      ></View>
      <View
        style={{ width: "100%", flexDirection: "row", marginTop: 14, gap: 8 }}
      >
        {Array.from({ length: 7 }, (_, index) => (
          <View
            key={index}
            style={{
              height: 60,
              borderRadius: 20,
              backgroundColor: "#F5F5F5",
              flex: 1,
            }}
          />
        ))}
      </View>
      <View
        style={{
          height: 130,
          width: "100%",
          borderRadius: 20,
          backgroundColor: "#F5F5F5",
          marginTop: 25
        }}
      ></View>
      <View
        style={{
          height: 150,
          width: "100%",
          borderRadius: 20,
          backgroundColor: "#F5F5F5",
          marginTop: 25
        }}
      ></View>
      <View
        style={{
          flex: 1,
          width: "100%",
          borderRadius: 20,
          backgroundColor: "#F5F5F5",
          marginTop: 25
        }}
      ></View>
    </SafeAreaView>
  );
};

export default LoadingDiary;
