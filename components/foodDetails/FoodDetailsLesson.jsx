import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import PotionIcon from "../../svgs/PotionIcon";
import COLOURS from "../../constants/colours";
import DangerTriangle from "../../svgs/DangerTriangle";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";
import { Path, Svg } from "react-native-svg";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ArrowDownShort from "../../svgs/ArrowDownShort";
import ADDITIVES from "../../constants/additives";

const FoodDetailsLesson = ({ additive }) => {
  const { theme } = useColourTheme();
  const rotation = useSharedValue(0); // Rotation for the arrow
  const [accordianOpen, setAccordianOpen] = useState(false);
  const [height, setHeight] = useState(0);

  const handleAccordianPress = () => {
    setAccordianOpen((prev) => !prev);
    rotation.value = withTiming(accordianOpen ? 0 : 180, {
      duration: 300,
      // easing: Easing.inOut,
    });
  };

  const arrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  const onLayout = (e) => {
    const layoutHeight = e.nativeEvent.layout.height;

    if (layoutHeight > 0 && layoutHeight !== height) {
      setHeight(layoutHeight);
    }
  };

  const openAnimatedStyle = useAnimatedStyle(() => {
    const animatedHeight = accordianOpen ? withTiming(height) : withTiming(0);
    return {
      height: animatedHeight,
    };
  });

  const additiveDescription = ADDITIVES[additive.split(" - ")[0]];

  return (
    <Pressable
      onPress={handleAccordianPress}
      style={[
        styles.container,
        {
          backgroundColor: themedColours.primaryBackground[theme],
          borderWidth: 1,
          borderColor: themedColours.stroke[theme],
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            flex: 1,
          }}
        >
          <DangerTriangle color={themedColours.primaryText[theme]} />
          <Text
            style={[
              styles.chemicalNameText,
              { color: themedColours.primaryText[theme] },
            ]}
          >
            {additive.split(" - ")[1]} ({additive.split(" - ")[0]})
          </Text>
        </View>
        <Animated.View style={arrowStyle}>
          <ArrowDownShort color={themedColours.primaryText[theme]} />
        </Animated.View>
      </View>
      {additiveDescription && <Animated.View style={[openAnimatedStyle, { overflow: "hidden" }]}>
        <View
          onLayout={onLayout}
          style={{ position: "absolute", width: "100%" }}
        >
          <Text
            style={{
              fontSize: 14,
              marginTop: 14,
              fontFamily: "Mulish_400Regular",
              color: themedColours.secondaryText[theme],
            }}
          >
            {additiveDescription}
          </Text>
        </View>
      </Animated.View>}
    </Pressable>
  );
};

export default FoodDetailsLesson;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,

    paddingVertical: 14,
    borderRadius: 12,
    // gap: 12,
  },
  chemicalNameText: { fontFamily: "Mulish_600SemiBold", fontSize: 16 },
  chemicalDescription: { fontFamily: "Mulish_400Regular", fontSize: 14 },
  lessonButton: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    backgroundColor: "white",
    height: 36,
    alignItems: "center",
    borderRadius: 20,
  },
  lessonButtonText: { fontFamily: "Mulish_600SemiBold", fontSize: 15 },
});
