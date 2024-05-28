import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import TopActions from "./TopActions";
import { Skeleton } from "moti/skeleton";
import COLOURS from "../../constants/colours";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const LoadingGroceries = () => {
  const { theme } = useColourTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themedColours.primaryBackground[theme],
      }}
    >
      <TopActions />
      <View style={{ gap: 14, padding: 20 }}>
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton
            key={index}
            colors={[
              themedColours.secondaryBackground[theme],
              themedColours.stroke[theme],
              themedColours.secondaryBackground[theme],
            ]}
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
