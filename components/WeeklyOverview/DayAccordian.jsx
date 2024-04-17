import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import ArrowDownShort from "../../svgs/ArrowDownShort";
import COLOURS from "../../constants/colours";
import GreenTickCircle from "../../svgs/GreenTickCircle";
import { Path, Svg } from "react-native-svg";
import Divider from "../settings/Divider";
import AccordianMetricLog from "./AccordianMetricLog";
import ArrowRight from "../../svgs/ArrowRight";

const DayAccordian = () => {

  const [accordianOpen, setAccordianOpen] = useState(false)

  return (
    <Pressable
    onPress={() => setAccordianOpen((prev) => !prev)}
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: COLOURS.lightGray,
        borderRadius: 20,
        paddingVertical: 20,
        gap: 14,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20
        }}
      >
        <Text
          style={{
            fontSize: 19,
            fontFamily: "Mulish_700Bold",
            color: COLOURS.nearBlack,
          }}
        >
          Day 1
        </Text>
        <ArrowDownShort />
      </View>
      <View style={{ flexDirection: "row", gap: 6, alignItems: "center", paddingHorizontal: 20 }}>
        <GreenTickCircle />
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Mulish_700Bold",
            color: COLOURS.darkGreen,
          }}
        >
          Success - no processed food
        </Text>
      </View>
      {accordianOpen && <View>
        <AccordianMetricLog />
        <AccordianMetricLog />
        <AccordianMetricLog />
        <AccordianMetricLog />
        <Pressable onPress={() => console.log('write notes')} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20}}>
          <Text style={{fontSize: 16, fontFamily: 'Mulish_700Bold', color: COLOURS.nearBlack}}>Add notes</Text>
          <ArrowRight />
        </Pressable>
      </View>}
    </Pressable>
  );
};

export default DayAccordian;
