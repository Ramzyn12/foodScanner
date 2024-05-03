import { View, Text, Pressable } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import ArrowRight from "../../svgs/ArrowRight";
import GreenIvyOne from "../../svgs/GreenIvyOne";
import GreenIvyTwo from "../../svgs/GreenIvyTwo";
import GreenIvyThree from "../../svgs/GreenIvyThree";
import { useNavigation } from "@react-navigation/native";
const ProBanner = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("Paywall")}
      style={{
        width: "100%",
        height: 93,
        flexDirection: "row",
        gap: 16,
        backgroundColor: COLOURS.lightGreen,
        borderRadius: 12,
        alignItems: "center",
        padding: 22,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 6,
          backgroundColor: COLOURS.greatFoodBackground,
        }}
      >
        <Text
          style={{
            color: COLOURS.greatFoodText,
            fontSize: 11,
            fontFamily: "Mulish_700Bold",
          }}
        >
          PRO
        </Text>
      </View>
      <View style={{ gap: 6, flex: 1 }}>
        <Text
          style={{
            fontSize: 19,
            fontFamily: "Mulish_700Bold",
            color: COLOURS.nearBlack,
          }}
        >
          Ivy Pro
        </Text>
        <Text style={{ fontSize: 14, fontFamily: "Mulish_400Regular" }}>
          Plans and benefits of going Pro
        </Text>
      </View>
      <ArrowRight />
      <GreenIvyOne />
      <GreenIvyTwo />
      <GreenIvyThree />
    </Pressable>
  );
};

export default ProBanner;
