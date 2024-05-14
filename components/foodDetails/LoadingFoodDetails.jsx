import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ClearIcon from "../../svgs/ClearIcon";
import { useNavigation } from "@react-navigation/native";
import COLOURS from "../../constants/colours";
import { Skeleton } from "moti/skeleton";

const LoadingFoodDetails = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", gap: 14 }}>
        <Skeleton
          colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
          height={60}
          width={60}
          radius={20}
        />
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <Skeleton
            colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
            height={16} // Approximate height of your list items
            radius={12}
            width={"100%"}
          />

          <Skeleton
            colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
            height={36} // Approximate height of your list items
            radius={12}
            width={"100%"}
          />
        </View>
        <Pressable
          style={{ alignSelf: "flex-start" }}
          onPress={() => navigation.goBack()}
        >
          <ClearIcon size={28} />
        </Pressable>
      </View>

      <View
        style={{
          marginTop: 30,
        }}
      >
        <Skeleton
          colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
          height={135} // Approximate height of your list items
          radius={20}
          width={"100%"}
        />
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Skeleton
          colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
          height={430} // Approximate height of your list items
          radius={20}
          width={"100%"}
        />
      </View>

      <View
        style={{
          marginTop: 20,
          flex: 1,
        }}
      >
        <Skeleton
          colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
          radius={20}
          height={"100%"}
          width={"100%"}
        />
      </View>
    </View>
  );
};

export default LoadingFoodDetails;
