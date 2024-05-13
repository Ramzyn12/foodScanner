import { View, Text, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ArrowDownShort from "../../svgs/ArrowDownShort";
import COLOURS from "../../constants/colours";
import GreenTickCircle from "../../svgs/GreenTickCircle";
import { Path, Svg } from "react-native-svg";
import Divider from "../settings/Divider";
import AccordianMetricLog from "./AccordianMetricLog";
import ArrowRight from "../../svgs/ArrowRight";
import { startOfDay } from "date-fns";
import GreyFail from "../../svgs/GreyFail";
import PendingClock from "../../svgs/PendingClock";
import LogModal from "../me/LogModal";
import { useNavigation } from "@react-navigation/native";
import { getCurrentDateLocal } from "../../utils/dateHelpers";
import Animated, {
  Easing,
  Layout,
  SlideInDown,
  SlideOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DayAccordian = ({ dayData, day }) => {
  const [accordianOpen, setAccordianOpen] = useState(false);
  const rotation = useSharedValue(0); // Rotation for the arrow
  const [height, setHeight] = useState(0);
  const navigation = useNavigation();
  const dateOfEntry = new Date(dayData?.date);
  const today = new Date(getCurrentDateLocal());

  const isPresent = today.toISOString() === dateOfEntry.toISOString();
  const isFuture = dateOfEntry > today;

  const svgWithoutTime = isSuccess ? <GreenTickCircle /> : <GreyFail />;

  const svg = isPresent ? <PendingClock /> : isFuture ? "" : svgWithoutTime;

  const isSuccess =
    dayData.diaryDetails.fastedState === true ||
    dayData.diaryDetails.diaryDayState === "unprocessed";

  const messageWithoutTime = isSuccess
    ? "Success - no processed food"
    : "Failed - you consumed processed food";

  const message = isPresent
    ? "In Progress"
    : isFuture
    ? ""
    : messageWithoutTime;

  const handleAccordianPress = () => {
    if (!isFuture) {
      setAccordianOpen((prev) => !prev);
      rotation.value = withTiming(accordianOpen ? 0 : 180, {
        duration: 300,
        // easing: Easing.inOut,
      });
    }
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

  return (
    <Pressable
      onPress={handleAccordianPress}
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: COLOURS.lightGray,
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 5,
        gap: 14,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 19,
            fontFamily: "Mulish_700Bold",
            color: COLOURS.nearBlack,
          }}
        >
          Day {day}
        </Text>
        {!isFuture && (
          <Animated.View style={arrowStyle}>
            <ArrowDownShort />
          </Animated.View>
        )}
      </View>
      {svg && (
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          {svg}
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
              color: COLOURS.darkGreen,
            }}
          >
            {message}
          </Text>
        </View>
      )}

      <Animated.View style={[openAnimatedStyle, { overflow: "hidden" }]}>
        <View
          onLayout={onLayout}
          style={{ position: "absolute", width: "100%" }}
        >
          {dayData.metrics.map((metric, index) => (
            <AccordianMetricLog
              date={dateOfEntry}
              metric={metric}
              key={index}
            />
          ))}
          <Pressable
            onPress={() =>
              navigation.navigate("AddNotes", {
                date: dateOfEntry.toISOString(),
                day,
              })
            }
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Mulish_700Bold",
                  color: COLOURS.nearBlack,
                }}
              >
                Add notes
              </Text>
              <ArrowRight />
            </View>
            {dayData?.note?.note && <Text numberOfLines={3} ellipsizeMode='tail' style={{marginTop: 14, fontSize: 12, fontFamily: 'Mulish_500Medium', color: '#636566'}}>{dayData?.note?.note.trim().split('\n').join('.')}</Text>}
          </Pressable>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default DayAccordian;
