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

const Me = ({ navigation }) => {
  const font = useFont(Mulish_300Light_Italic, 12);
  const bottomSheetModalRef = useRef(null);

  const insets = useSafeAreaInsets();

  const handlePresentModalPress = useCallback((e) => {
    e.stopPropagation()
    bottomSheetModalRef.current?.present();
  }, []);

  const handleHideModal = useCallback(() => {
    // console.log('close');
    bottomSheetModalRef.current?.close();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingHorizontal: 20,
      }}
    >
      <View>
        <Pressable
          onPress={() => navigation.navigate("Settings")}
          hitSlop={40}
          style={{ alignItems: "flex-end", paddingVertical: 20 }}
        >
          <SettingsIconNoFill />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <HealthCard onLog={handlePresentModalPress} />
          <HealthCard isGraph={true} />
          <InviteFriendsCard />
        </View>
      </ScrollView>
      <LogModal onClose={handleHideModal} ref={bottomSheetModalRef} />
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
