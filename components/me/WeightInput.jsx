import { View, Text, Pressable, TextInput } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";

const WeightInput = () => {
  return (
    <View style={{ gap: 14 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Pressable
          style={{
            height: 36,
            paddingHorizontal: 14,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: COLOURS.darkGreen,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
              color: "white",
            }}
          >
            Imperial
          </Text>
        </Pressable>
        <Pressable
          style={{
            height: 36,
            paddingHorizontal: 14,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            borderWidth: 1,
            borderColor: COLOURS.lightGray,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
              color: COLOURS.nearBlack,
            }}
          >
            Metric
          </Text>
        </Pressable>
      </View>

      <TextInput
        placeholder="Weight (KG)"
        placeholderTextColor={"#A4A4A4"}
        style={{
          padding: 20,
          height: 58,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: COLOURS.lightGray,
          fontSize: 14,
          fontFamily: "Mulish_700Bold",
          color: COLOURS.nearBlack,
        }}
      />
    </View>
  );
};

export default WeightInput;
