import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ClearIcon from "../../svgs/ClearIcon";
import { useNavigation } from "@react-navigation/native";
import COLOURS from "../../constants/colours";
import { Skeleton } from "moti/skeleton";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const LoadingFoodDetails = () => {
  const navigation = useNavigation();
  const { theme } = useColourTheme();
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: themedColours.primaryBackground[theme],
      }}
    >
      <View style={{ flexDirection: "row", gap: 14 }}>
        <Skeleton
          colors={[
            themedColours.secondaryBackground[theme],
            themedColours.stroke[theme],
            themedColours.secondaryBackground[theme],
          ]}
          height={60}
          width={60}
          radius={20}
        />
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <Skeleton
            colors={[
              themedColours.secondaryBackground[theme],
              themedColours.stroke[theme],
              themedColours.secondaryBackground[theme],
            ]}
            height={16} // Approximate height of your list items
            radius={12}
            width={"100%"}
          />

          <Skeleton
            colors={[
              themedColours.secondaryBackground[theme],
              themedColours.stroke[theme],
              themedColours.secondaryBackground[theme],
            ]}
            height={36} // Approximate height of your list items
            radius={12}
            width={"100%"}
          />
        </View>
        <Pressable
          style={{ alignSelf: "flex-start" }}
          onPress={() => navigation.goBack()}
        >
          <ClearIcon
            crossColor={themedColours.secondaryText[theme]}
            background={themedColours.secondaryBackground[theme]}
            size={28}
          />
        </Pressable>
      </View>

      <View
        style={{
          marginTop: 30,
        }}
      >
        <Skeleton
          colors={[
            themedColours.secondaryBackground[theme],
            themedColours.stroke[theme],
            themedColours.secondaryBackground[theme],
          ]}
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
  colors={[
    themedColours.secondaryBackground[theme],
    themedColours.stroke[theme],
    themedColours.secondaryBackground[theme],
  ]}          height={430} // Approximate height of your list items
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
  colors={[
    themedColours.secondaryBackground[theme],
    themedColours.stroke[theme],
    themedColours.secondaryBackground[theme],
  ]}          radius={20}
          height={"100%"}
          width={"100%"}
        />
      </View>
    </View>
  );
};

export default LoadingFoodDetails;
