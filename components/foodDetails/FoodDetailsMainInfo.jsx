import { View, Text, ImageBackground, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import COLOURS from "../../constants/colours";
import Flask from "../../svgs/Flask";
import FoodDetailsLesson from "./FoodDetailsLesson";
import RainDrops from "../../svgs/RainDrops";
import PalmTree from "../../svgs/PalmTree";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import FakeBlurComponent from "./FakeBlurComponent";
// import { BlurView } from "@react-native-community/blur";

const FoodDetailsMainInfo = () => {
  const currentFood = useSelector((state) => state.food.currentFood);
  const [hasProSub, setHasProSub] = useState(false)
  const title =
    currentFood.processedState === "Processed"
      ? "Why you should avoid this"
      : `Why it's a great choice`;

  const message = currentFood.processedState === "Processed" ? 'We recommend avoiding this product as it is considered highly processed based on the ingredients and additives.' : 'This product is a great choice as it occurs naturally on the earth, is nutrient dense, and does not contain harmful additives or ingredients.'

  const background = currentFood.processedState === "Processed" ? "#FAD8D5" : "#CAE2C3";
  const angle = 109;
  const angleRad = (Math.PI * angle) / 180;
  const start = {
    x: 0.5 - Math.sin(angleRad) / 2,
    y: 0.5 + Math.cos(angleRad) / 2,
  };
  const end = {
    x: 0.5 + Math.sin(angleRad) / 2,
    y: 0.5 - Math.cos(angleRad) / 2,
  };

  return (
    <View
      style={{
        marginTop: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: COLOURS.lightGray,
        borderRadius: 20,
        gap: 14,
      }}
    >
      {!hasProSub && <LinearGradient
        colors={["#5135C1", "#EE0A93"]}
        start={start}
        end={end}
        style={{
          paddingHorizontal: 14,
          borderRadius: 6,
          paddingVertical: 8,
          alignSelf: "flex-start",
        }}
      >
        <Text
          style={{ color: "white", fontSize: 14, fontFamily: "Mulish_700Bold" }}
        >
          Pro feature
        </Text>
      </LinearGradient>}
      <Text
        style={{
          fontSize: 19,
          color: COLOURS.nearBlack,
          fontFamily: "Mulish_700Bold",
        }}
      >
        {title}
      </Text>
      {hasProSub && <View style={{ gap: 14 }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Mulish_400Regular",
            color: "#636566",
          }}
        >
          {message}
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
                backgroundColor: currentFood.additives.length > 0 ? '#FAD8D5' : '#CAE2C3',
                borderRadius: 44,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Flask />
            </View>
            <Text
              style={{
                fontFamily: "Mulish_400Regular",
                fontSize: 14,
                color: COLOURS.nearBlack,
              }}
            >
              {currentFood.additives.length > 0
                ? currentFood.additives.length
                : "No"}{" "}
              additives
            </Text>
          </View>
          <View style={{ gap: 8 }}>
            <View
              style={{
                width: 44,
                alignSelf: "center",
                height: 44,
                backgroundColor: currentFood.hasVegetableOil ? '#FAD8D5' : '#CAE2C3',
                borderRadius: 44,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RainDrops />
            </View>
            <Text
              style={{
                fontFamily: "Mulish_400Regular",
                fontSize: 14,
                color: COLOURS.nearBlack,
              }}
            >
              {currentFood.hasVegetableOil ? "Vegetable oil" : "No vegetable oil"}
            </Text>
          </View>
          <View style={{ gap: 8 }}>
            <View
              style={{
                width: 44,
                alignSelf: "center",
                height: 44,
                backgroundColor: currentFood.hasPalmOil ? '#FAD8D5' : '#CAE2C3',
                borderRadius: 44,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PalmTree />
            </View>
            <Text
              style={{
                fontFamily: "Mulish_400Regular",
                fontSize: 14,
                color: COLOURS.nearBlack,
              }}
            >
              {currentFood.hasPalmOil ? "Palm oil" : "No palm oil"}
            </Text>
          </View>
        </View>
        {currentFood?.additives.map((el) => (
          <FoodDetailsLesson key={el} additive={el} />
        ))}
      </View>}
      {!hasProSub && <FakeBlurComponent processedState={currentFood.processedState} />}

      {!hasProSub && <Pressable onPress={() => setHasProSub(true)}>
        <LinearGradient
        colors={["#5135C1", "#EE0A93"]}
        start={start}
        end={end}
        
        style={{
          paddingHorizontal: 14,
          borderRadius: 12,
          paddingVertical: 8,
          height: 44,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ color: "white", fontSize: 14, fontFamily: "Mulish_700Bold" }}
        >
          Try Pro
        </Text>
      </LinearGradient>
      </Pressable>}
      

      {/* <Text>{currentFood?.additives.length} Additives</Text>
      <Text>{currentFood?.hasVegetableOil ? 'Has' : 'No'} Veg oil</Text>
      <Text>{currentFood?.hasPalmOil} palm oil</Text> */}
    </View>
  );
};

export default FoodDetailsMainInfo;
