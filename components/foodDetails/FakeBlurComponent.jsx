import { View, Text, StyleSheet, AccessibilityInfo } from "react-native";
import React, { useEffect, useState } from "react";
import RainDrops from "../../svgs/RainDrops";
import PalmTree from "../../svgs/PalmTree";
import FoodDetailsLesson from "./FoodDetailsLesson";
import { BlurView } from "@react-native-community/blur";
import COLOURS from "../../constants/colours";
import Flask from "../../svgs/Flask";

const FakeBlurComponent = ({ processedState }) => {
  const background = processedState === "Processed" ? "#FAD8D5" : "#CAE2C3";
  const [isReduceTransparencyEnabled, setIsReduceTransparencyEnabled] =
    useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceTransparencyEnabled().then((isEnabled) => {
      setIsReduceTransparencyEnabled(isEnabled);
    });
  }, []);
  return (
    <View style={{ gap: 14 }}>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Mulish_400Regular",
          color: "#636566",
        }}
      >
        This product is a great choice as it occurs naturally on the earth, is
        nutrient dense, and does not contain harmful additives or ingredients.
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: 8 }}>
          <View
            style={{
              width: 44,
              alignSelf: "center",
              height: 44,
              backgroundColor: background,
              borderRadius: 44,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Flask />
          </View>
          <Text style={{ textAlign: "center" }}>No additives</Text>
        </View>
        <View style={{ gap: 8 }}>
          <View
            style={{
              width: 44,
              alignSelf: "center",
              height: 44,
              backgroundColor: background,
              borderRadius: 44,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RainDrops />
          </View>
          <Text style={{ textAlign: "center" }}>No Vegetable oil</Text>
        </View>
        <View style={{ gap: 8 }}>
          <View
            style={{
              width: 44,
              alignSelf: "center",
              height: 44,
              backgroundColor: background,
              borderRadius: 44,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PalmTree />
          </View>
          <Text style={{ textAlign: "center" }}>No palm oil</Text>
        </View>
      </View>
      <FoodDetailsLesson additive={"Caratonoids - E330"} />
      <FoodDetailsLesson additive={"Seed Oils"} />

      {!isReduceTransparencyEnabled && (
        <BlurView
          blurType="light"
          blurAmount={5}
          // reducedTransparencyFallbackColor={COLOURS.lightGray}
          style={[
            StyleSheet.absoluteFill,
            { left: -10, right: -10, top: -10, bottom: -10 },
          ]}
        ></BlurView>
      )}
      {isReduceTransparencyEnabled && <View style={[StyleSheet.absoluteFill, {alignItems: 'center', backgroundColor: 'white', justifyContent: "center"}]}>
          <Text>Reduce trans enabled</Text>
        </View>}
    </View>
  );
};

export default FakeBlurComponent;
