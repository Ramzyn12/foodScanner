import {
  View,
  Text,
  Button,
  Pressable,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Area,
  CartesianChart,
  Line,
  useAreaPath,
  useLinePath,
} from "victory-native";
import {
  Group,
  LinearGradient,
  Path,
  Skia,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import { Mulish_300Light_Italic } from "@expo-google-fonts/mulish";
import COLOURS from "../constants/colours";
import ProBanner from "../components/settings/ProBanner";
import Purchases from "react-native-purchases";
import HealthCard from "../components/me/HealthCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SettingsIconNoFill from "../svgs/SettingsIconNoFill";
import LogModal from "../components/me/LogModal";
import InviteFriendsCard from "../components/me/InviteFriendsCard";
import Animated, { interpolate } from "react-native-reanimated";
import { useSubscriptionState } from "../hooks/useSubscriptionState";
import {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";

const Me = ({ navigation }) => {
  const font = useFont(Mulish_300Light_Italic, 12);
  const bottomSheetModalRef = useRef(null);
  const scrollY = useSharedValue(0); 
  const insets = useSafeAreaInsets();
  const {theme} = useColourTheme()
  const [currentMetric, setCurrentMetric] = useState(null);

  const handlePresentModalPress = useCallback((metricType) => {
    setCurrentMetric(metricType);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleHideModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  // Animated scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [24, 60], // Start fading from 0 to 50 pixels scroll
      [0, 1], // From fully transparent to fully opaque
    );

    return {
      opacity,
    };
  });

  const { isSubscribed } = useSubscriptionState();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themedColours.primaryBackground[theme],
        paddingTop: insets.top,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: 28 }}></View>
        <Animated.Text
          style={[
            {
              fontSize: 19,
              fontFamily: "Mulish_700Bold",
              textAlign: "center",
              color: themedColours.primaryText[theme],
            },
            animatedTextStyle,
          ]}
        >
          Me
        </Animated.Text>

        <Pressable
          onPress={() => navigation.navigate("Settings")}
          hitSlop={40}
          style={{ alignItems: "flex-end", paddingVertical: 20 }}
        >
          <SettingsIconNoFill color={themedColours.primaryText[theme]} />
        </Pressable>
      </View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 20, flex: 1, paddingBottom: 100 }}>
          <Text
            style={{
              fontSize: 34,
              fontFamily: "Mulish_700Bold",
              color: themedColours.primaryText[theme],
            }}
          >
            Me
          </Text>
          <ProBanner />
          <HealthCard
            leftLable={"None"}
            rightLable={"Extreme"}
            onLog={handlePresentModalPress}
            metricType="Anxiety"
          />
          <HealthCard
            leftLable={"Terrible"}
            rightLable={"Great"}
            onLog={handlePresentModalPress}
            metricType="Sleep Quality"
          />
          <HealthCard
            leftLable={"Very Low"}
            rightLable={"Very High"}
            onLog={handlePresentModalPress}
            metricType="Energy"
          />
          <HealthCard metricType="Weight" onLog={handlePresentModalPress} />
          <InviteFriendsCard />
        </View>
      </Animated.ScrollView>
      <LogModal
        onClose={handleHideModal}
        metricType={currentMetric}
        ref={bottomSheetModalRef}
      />
    </View>
  );
};


export default Me;
