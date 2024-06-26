import { View, Text, Pressable } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeIn, SlideInRight } from "react-native-reanimated";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const ProgressBar = ({ percent, hideBack }) => {
  const navigation = useNavigation();
  const {theme} = useColourTheme()

  const fullWidth = 210;
  const completedWidth = (210 * percent) / 100;

  return (
    <Animated.View
      sharedTransitionTag="progressBar"
      style={{
        position: "relative",
        width: "100%",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      {!hideBack && (
        <Pressable
          style={{ position: "absolute", left: 0 }}
          hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
          onPress={() => navigation.goBack()}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="12"
            viewBox="0 0 6 12"
            fill="none"
          >
            <Path
              d="M5.52796 1.53269C5.82216 1.24111 5.82427 0.766238 5.53269 0.472041C5.24111 0.177844 4.76624 0.175726 4.47204 0.467309L2.67731 2.2461C2.00134 2.91604 1.44886 3.46359 1.05706 3.95146C0.649628 4.45878 0.354695 4.97372 0.275909 5.59184C0.241364 5.86286 0.241364 6.13714 0.275909 6.40816C0.354695 7.02628 0.649628 7.54122 1.05706 8.04854C1.44886 8.53641 2.00133 9.08395 2.6773 9.75389L4.47204 11.5327C4.76624 11.8243 5.24111 11.8222 5.53269 11.528C5.82427 11.2338 5.82216 10.7589 5.52796 10.4673L3.76499 8.72C3.0495 8.01086 2.55869 7.52282 2.22659 7.10929C1.904 6.7076 1.79332 6.44958 1.76387 6.2185C1.74538 6.07341 1.74538 5.92659 1.76387 5.7815C1.79332 5.55042 1.904 5.2924 2.22659 4.89071C2.55869 4.47718 3.0495 3.98914 3.76499 3.28L5.52796 1.53269Z"
              fill={themedColours.primaryText[theme]}
            />
          </Svg>
        </Pressable>
      )}
      <View
        style={{
          width: fullWidth,
          height: 8,
          borderRadius: 200,
          borderWidth: 1,
          borderColor: themedColours.stroke[theme],
          backgroundColor: themedColours.secondaryBackground[theme],
        }}
      >
        <Animated.View
          entering={FadeIn.duration(500)}
          sharedTransitionTag="progress"
          style={{
            width: completedWidth,
            height: "100%",

            borderRadius: 200,
            backgroundColor: themedColours.primary[theme],
          }}
        ></Animated.View>
      </View>
    </Animated.View>
  );
};

export default ProgressBar;
