import React, { useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Pressable, Text } from "react-native";
import LeftHalfHeart from "../../svgs/LeftHalfHeart";
import RightHalfHeart from "../../svgs/RightHalfHeart";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withDelay,
} from "react-native-reanimated";

const HeartAnimation = ({ navigation }) => {
  // Shared values for the animation
  const leftHeartPosition = useSharedValue(0);
  const rightHeartPosition = useSharedValue(0);
  const leftHeartRotation = useSharedValue(0);
  const rightHeartRotation = useSharedValue(0);
  // const bothHeartScale = useSharedValue(1);

  // Animated styles for the left heart
  const leftHeartStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: leftHeartPosition.value },
      { rotate: `${leftHeartRotation.value}deg` },
    ],
  }));

  // Animated styles for the right heart
  const rightHeartStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: rightHeartPosition.value },
      { rotate: `${rightHeartRotation.value}deg` },
    ],
  }));

  // const scaleStyle = useAnimatedStyle(() => ({
  //   transform: [{ scale: bothHeartScale.value }],
  // }));

  const handleAnimationEnd = () => {
    setTimeout(() => {
      navigation.navigate("QuestionIntro");
    }, 400);
  };

  useEffect(() => {
    leftHeartPosition.value = withTiming(27, { duration: 800 }); // Example: Move left heart closer
    rightHeartPosition.value = withTiming(-30, { duration: 800 }); // Example: Move right heart closer
    leftHeartRotation.value = withTiming(13, { duration: 800 }); // Rotate left heart
    rightHeartRotation.value = withTiming(-8, { duration: 800 }, () => {
      runOnJS(handleAnimationEnd)();
    }); // Rotate right heart
  }, []);

  const handleAnimate = () => {
    // Reset positions and rotations to start before animating
    leftHeartPosition.value = withTiming(0, { duration: 0 }); // Instantly reset to original position
    rightHeartPosition.value = withTiming(0, { duration: 0 }); // Instantly reset to original position
    leftHeartRotation.value = withTiming(0, { duration: 0 }); // Instantly reset to original rotation
    rightHeartRotation.value = withTiming(0, { duration: 0 }); // Instantly reset to original rotation

    // Delay to ensure reset completes before starting new animation
    setTimeout(() => {
      // Start a new animation
      leftHeartPosition.value = withTiming(27, { duration: 800 }); // Example: Move left heart closer
      rightHeartPosition.value = withTiming(-30, { duration: 800 }); // Example: Move right heart closer
      leftHeartRotation.value = withTiming(13, { duration: 800 }); // Rotate left heart
      rightHeartRotation.value = withTiming(-8, { duration: 800 }, () => {
        runOnJS(handleAnimationEnd)();
      }); // Rotate right heart
    }, 200); // Small delay to ensure reset is visually imperceptible
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[leftHeartStyle]}>
        <LeftHalfHeart />
      </Animated.View>
      <Animated.View style={[rightHeartStyle]}>
        <RightHalfHeart />
      </Animated.View>
      {/* <Animated.Image
        style={[leftHeartStyle]}
        sharedTransitionTag="leftHeart"
        source={require("../../assets/Vector-3.png")}
      />
      <Animated.Image
        sharedTransitionTag="rightHeart"
        source={require("../../assets/Vector-4.png")}
        style={[rightHeartStyle]}
      /> */}
    </View>
  );
};

export default HeartAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30,
    flexDirection: "row",
  },
});
