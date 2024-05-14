import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import COLOURS from "../../constants/colours";
import { Skeleton } from "moti/skeleton";

const LoadingDiary = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 1, padding: 20 }}>
        <Skeleton
          // key={index}
          colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
          height={42} // Approximate height of your list items
          width={140}
          radius={20}
        />
        <View style={{ flexDirection: "row", marginTop: 14, gap: 8 }}>
          {Array.from({ length: 7 }, (_, index) => (
            <View style={{ flex: 1 }} key={index}>
              <Skeleton
                colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
                height={60} // Approximate height of your list items
                radius={20}
                width={"100%"}
              />
            </View>
          ))}
        </View>
        <View
          style={{
            marginTop: 25,
          }}
        >
          <Skeleton
            colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
            height={130} // Approximate height of your list items
            radius={20}
            width={"100%"}
          />
        </View>

        <View
          style={{
            marginTop: 25,
          }}
        >
          <Skeleton
            colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
            height={150} // Approximate height of your list items
            radius={20}
            width={"100%"}
          />
        </View>
     

        <View
          style={{
            marginTop: 25,
            flex: 1,
          }}
        >
          <Skeleton
            colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
            height={"100%"} // Approximate height of your list items
            radius={20}
            width={"100%"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoadingDiary;
