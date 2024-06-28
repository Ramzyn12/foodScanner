import { View, Text, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import COLOURS from "../../constants/colours";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const WeightInput = ({
  bottomSheetBehaviour,
  value,
  setValue,
  setWeightUnit,
  weightUnit,
}) => {
  const isImperial = weightUnit === 'imperial'
  const isMetric = weightUnit === 'metric'
  const {theme} = useColourTheme()

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
            backgroundColor: isImperial ? themedColours.primary[theme]: themedColours.primaryBackground[theme],
            borderWidth: 1,
            borderColor: isImperial ? 'transparent' : themedColours.stroke[theme],
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
              color: isImperial ? themedColours.primaryBackground[theme] : themedColours.primaryText[theme],
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
            backgroundColor: isMetric ? themedColours.primary[theme]: themedColours.primaryBackground[theme],
            borderWidth: 1,
            borderColor: isMetric ? 'transparent' : themedColours.stroke[theme],
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
              color: isMetric ? themedColours.primaryBackground[theme] : themedColours.primaryText[theme],
            }}
          >
            Metric
          </Text>
        </Pressable>
      </View>}

      {bottomSheetBehaviour ? (
        <BottomSheetTextInput
          placeholder={`Weight (${isImperial ? 'lbs' : 'KG'})`}
          value={value.toString()}
          inputMode="decimal"
          onChangeText={setValue}
          placeholderTextColor={themedColours.secondaryText[theme]}
          style={{
            padding: 20,
            height: 58,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: themedColours.stroke[theme],
            fontSize: 14,
            fontFamily: "Mulish_700Bold",
            color: themedColours.primaryText[theme],
          }}
        />
      ) : (
        <TextInput
          placeholder={`Weight (${isImperial ? 'lbs' : 'KG'})`}
          placeholderTextColor={themedColours.secondaryText[theme]}
          value={value.toString()}
          inputMode="decimal"
          onChangeText={setValue}
          style={{
            padding: 20,
            height: 58,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: themedColours.stroke[theme],
            fontSize: 14,
            fontFamily: "Mulish_700Bold",
            color: themedColours.primaryText[theme],
          }}
        />
      )}
    </View>
  );
};

export default WeightInput;
