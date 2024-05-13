import { View, Text } from "react-native";
import React from "react";

const LoadingSearchList = () => {
  return (
    <View style={{gap: 20, flex: 1, marginTop: 20}}>
      {Array.from({ length: 8 }, (_, index) => (
        <View
          key={index}
          style={{
            height: 60,
            borderRadius: 12,
            backgroundColor: "#F5F5F5",
            // backgroundColor: "blue",
          }}
        />
      ))}
    </View>
  );
};

export default LoadingSearchList;
