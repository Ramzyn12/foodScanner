import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import TopActions from "./TopActions";
import { Skeleton } from "moti/skeleton";
import COLOURS from '../../constants/colours'

const LoadingGroceries = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <TopActions />
      <View style={{ gap: 14, padding: 20 }}>
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton
            key={index}
            colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
            radius={12}
            height={60}
            width={"100%"}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default LoadingGroceries;
