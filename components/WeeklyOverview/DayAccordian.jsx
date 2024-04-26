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

const DayAccordian = ({ dayData, day }) => {
  const [accordianOpen, setAccordianOpen] = useState(false);


  const navigation = useNavigation();
  const dateOfEntry = new Date(dayData?.date);
  const today = new Date(getCurrentDateLocal())

  
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
    }
  };

  return (
    <Pressable
      onPress={handleAccordianPress}
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: COLOURS.lightGray,
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: accordianOpen ? 0 : 20,
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
        <ArrowDownShort />
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
      {accordianOpen && (
        <View>
          {dayData.metrics.map((metric, index) => (
            <AccordianMetricLog
              date={dateOfEntry}
              metric={metric}
              key={index}
            />
          ))}
          {/* <AccordianMetricLog />
          <AccordianMetricLog />
          <AccordianMetricLog />
          <AccordianMetricLog /> */}
          <Pressable
            onPress={() =>
              navigation.navigate("AddNotes", { date: dateOfEntry.toISOString(), day })
            }
            style={{
              // backgroundColor: 'red',
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 20,
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
          </Pressable>
        </View>
      )}
    </Pressable>
  );
};

export default DayAccordian;
