import { View, Text, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import COLOURS from "../../constants/colours";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";

const WeightInput = ({
  bottomSheetBehaviour,
  value,
  setValue,
  setWeightUnit,
  weightUnit,
}) => {
  const isImperial = weightUnit === 'imperial'
  const isMetric = weightUnit === 'metric'

  return (
    <View style={{ gap: 14 }}>
      {bottomSheetBehaviour && <View style={{ flexDirection: "row", gap: 8 }}>
        <Pressable
          onPress={() => setWeightUnit("imperial")}
          style={{
            height: 36,
            paddingHorizontal: 14,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: isImperial ? COLOURS.darkGreen : 'white',
            borderWidth: 1,
            borderColor: isImperial ? 'transparent' : COLOURS.lightGray,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
              color: isImperial ? "white" : COLOURS.nearBlack,
            }}
          >
            Imperial
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setWeightUnit("metric")}
          style={{
            height: 36,
            paddingHorizontal: 14,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: isMetric ? COLOURS.darkGreen : 'white',
            borderWidth: 1,
            borderColor: isMetric ? 'transparent' : COLOURS.lightGray,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
              color: isMetric ? "white" : COLOURS.nearBlack,
            }}
          >
            Metric
          </Text>
        </Pressable>
      </View>}

      {bottomSheetBehaviour ? (
        <BottomSheetTextInput
          placeholder={`Weight (${isImperial ? 'KG' : 'lbs'})`}
          value={value.toString()}
          inputMode="decimal"
          onChangeText={setValue}
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
      ) : (
        <TextInput
          placeholder={`Weight (${isImperial ? 'KG' : 'lbs'})`}
          placeholderTextColor={"#A4A4A4"}
          value={value.toString()}
          inputMode="decimal"
          onChangeText={setValue}
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
      )}
    </View>
  );
};

export default WeightInput;
