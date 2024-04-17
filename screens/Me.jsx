import {
  View,
  Text,
  Button,
  Pressable,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
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
import ArrowRight from "../svgs/ArrowRight";

import HealthCard from "../components/me/HealthCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SettingsIconNoFill from "../svgs/SettingsIconNoFill";
import LogModal from "../components/me/LogModal";
import InviteFriendsCard from "../components/me/InviteFriendsCard";
import { Animated } from "react-native";

const Me = ({ navigation }) => {
  const font = useFont(Mulish_300Light_Italic, 12);
  const bottomSheetModalRef = useRef(null);
  const [showSmallMe, setShowSmallMe] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current; // Use Animated.Value to track scroll position
  const insets = useSafeAreaInsets();

  const [currentMetric, setCurrentMetric] = useState(null);

  const handlePresentModalPress = useCallback((metricType) => {
    setCurrentMetric(metricType);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleHideModal = useCallback(() => {
    // console.log('close');
    bottomSheetModalRef.current?.close();
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowSmallMe(offsetY > 34);
      },
      useNativeDriver: false, // Use native driver for better performance
    }
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingHorizontal: 20,
      }}
    >
      <View style={{ flexDirection: "row", width: "100%", alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ width: 28 }}></View>
        {showSmallMe && (
          <Text
            style={{
              fontSize: 19,
              fontFamily: "Mulish_700Bold",
              textAlign: 'center',
              color: COLOURS.nearBlack,
            }}
          >
            Me
          </Text>
        )}
        <Pressable
          onPress={() => navigation.navigate("Settings")}
          hitSlop={40}
          style={{ alignItems: "flex-end", paddingVertical: 20 }}
        >
          <SettingsIconNoFill />
        </Pressable>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 20, flex: 1, paddingBottom: 100 }}>
          <Text
            style={{
              fontSize: 34,
              fontFamily: "Mulish_700Bold",
              color: COLOURS.nearBlack,
            }}
          >
            Me
          </Text>
          <ProBanner />
          <HealthCard leftLable={'None'} rightLable={'Extreme'} onLog={handlePresentModalPress} metricType='Anxiety' />
          <HealthCard leftLable={'Terrible'} rightLable={'Great'} onLog={handlePresentModalPress} metricType='Sleep Quality' />
          <HealthCard leftLable={'Very Low'} rightLable={'Very High'} onLog={handlePresentModalPress} metricType='Energy' />
          <HealthCard metricType="Weight" onLog={handlePresentModalPress} />
          <InviteFriendsCard />
        </View>
      </ScrollView>
      <LogModal onClose={handleHideModal} metricType={currentMetric} ref={bottomSheetModalRef} />
    </View>
  );
};

const StockChart = ({ points, chartBounds }) => {
  const { path: areaPath } = useAreaPath(points.highTmp, chartBounds.bottom, {
    curveType: "natural",
  });
  const { path: linePath } = useLinePath(points.highTmp, {
    curveType: "natural",
  });

  return (
    <>
      <Group>
        <Path path={areaPath} style="fill">
          <LinearGradient
            start={vec(0, 0)}
            end={vec(chartBounds.top, chartBounds.bottom)}
            colors={["#CFDACC", "white"]}
          />
        </Path>
        <Path
          path={linePath}
          style="stroke"
          strokeWidth={4}
          color={COLOURS.darkGreen}
        />
      </Group>
    </>
  );
};

export default Me;
