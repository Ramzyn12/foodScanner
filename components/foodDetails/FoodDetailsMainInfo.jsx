import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";
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
import { Image } from "react-native";
import FoodDetailReasonCard from "./FoodDetailReasonCard";
import { useSubscriptionState } from "../../hooks/useSubscriptionState";
// import { BlurView } from "@react-native-community/blur";

const FoodDetailsMainInfo = () => {
  const currentFood = useSelector((state) => state.food.currentFood);
  // const { isSubscribed } = useSubscriptionState()
  const isSubscribed = false;
  const isUnknown = currentFood.processedState === "Unknown";
  const title =
    currentFood.processedState === "Processed"
      ? "Why you should avoid this"
      : `Why it's a great choice`;

  const message =
    currentFood.processedState === "Processed"
      ? "We recommend avoiding this product as it is considered highly processed based on the ingredients and additives."
      : "This product is a great choice as it occurs naturally on the earth, is nutrient dense, and does not contain harmful additives or ingredients.";

  const background =
    currentFood.processedState === "Processed" ? "#FAD8D5" : "#CAE2C3";
  const angle = 91;
  const angleRad = (Math.PI * angle) / 180;
  const start = {
    x: 0.5 - Math.sin(angleRad) / 2,
    y: 0.5 + Math.cos(angleRad) / 2,
  };
  const end = {
    x: 0.5 + Math.sin(angleRad) / 2,
    y: 0.5 - Math.cos(angleRad) / 2,
  };

  if (isUnknown) {
    return null
  }

  return (
    <View style={styles.container}>
      {!isSubscribed && (
        <LinearGradient
          colors={["#0B5253", "#19999C"]}
          start={start}
          end={end}
          style={styles.proFeatureTextContainer}
        >
          <Text style={styles.proFeatureText}>Pro</Text>
        </LinearGradient>
      )}
      <Text style={styles.titleText}>{title}</Text>
      {isSubscribed && (
        <View style={{ gap: 14 }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_400Regular",
              color: "#636566",
            }}
          >
            {message}
          </Text>
          <View style={styles.foodDetailReasonContainer}>
            <FoodDetailReasonCard type={"Additive"} currentFood={currentFood} />
            <FoodDetailReasonCard
              type={"Vegetable"}
              currentFood={currentFood}
            />
            <FoodDetailReasonCard type={"Palm"} currentFood={currentFood} />
          </View>
          {currentFood?.additives.map((el) => (
            <FoodDetailsLesson key={el} additive={el} />
          ))}
        </View>
      )}
      {!isSubscribed && (
        <Image
          style={{ resizeMode: "contain", width: "100%", height: 280 }}
          source={require("../../assets/BlurImage.png")}
        />
      )}
      {!isSubscribed && (
        <Pressable onPress={() => setisSubscribed(true)}>
          <LinearGradient
            colors={["#0B5253", "#19999C"]}
            start={start}
            end={end}
            style={styles.tryProButtonContainer}
          >
            <Text style={styles.tryProText}>Try Pro</Text>
            <Text
              style={{
                color: "#F7F6EF",
                fontSize: 12,
                fontFamily: "Mulish_700Bold",
              }}
            >
              7 days free then £4.99/month
            </Text>
          </LinearGradient>
        </Pressable>
      )}
    </View>
  );
};

export default FoodDetailsMainInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
    borderRadius: 20,
    gap: 14,
  },
  proFeatureTextContainer: {
    paddingHorizontal: 12,
    borderRadius: 30,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  proFeatureText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Mulish_700Bold",
  },
  titleText: {
    fontSize: 19,
    color: COLOURS.nearBlack,
    fontFamily: "Mulish_700Bold",
  },
  foodDetailReasonContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  tryProButtonContainer: {
    paddingHorizontal: 14,
    borderRadius: 12,
    paddingVertical: 8,
    gap: 4,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  tryProText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Mulish_700Bold",
  },
});
