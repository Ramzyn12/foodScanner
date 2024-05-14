import { View, Text } from "react-native";
import React from "react";
import { Skeleton } from "moti/skeleton";
import COLOURS from '../../constants/colours'

const LoadingSearchList = () => {
  return (
    <View style={{gap: 10, flex: 1, marginTop: 15}}>
      {Array.from({ length: 8 }, (_, index) => (
        <Skeleton
        key={index}
        colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5" ]} // Custom colors for the skeleton
        height={60} // Approximate height of your list items
        width="100%"
        radius={12}
      />
      ))}
    </View>
  );
};

export default LoadingSearchList;
