import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import { Path, Svg } from "react-native-svg";
import TimelineEventCard from "./TimelineEventCard";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const TimelineEvent = ({ unlocked, data, daysFinished, remainingDaysToUnlock, isLoading }) => {
  const {theme} = useColourTheme()
  return (
    <View style={styles.container}>
      
      <View style={{ alignItems: "center", marginRight: -1 }}>
        <Text style={{ fontSize: 11, fontFamily: "Mulish_800ExtraBold", color: themedColours.primaryText[theme] }}>week</Text>
        <Text style={{ fontSize: 16, fontFamily: "Mulish_700Bold", color: themedColours.primaryText[theme] }}>
          {data.week}
        </Text>
      </View>

      {/* Green Dot */}
      <View style={[styles.circle, {backgroundColor: themedColours.primary[theme]}]}></View>


      <TimelineEventCard
        destination={"WeeklyOverview"}
        data={data}
        unlocked={unlocked}
        daysFinished={daysFinished}
        remainingDaysToUnlock={remainingDaysToUnlock}
      />

    </View>
  );
};

export default TimelineEvent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    padding: 20,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: COLOURS.darkGreen,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: COLOURS.darkGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    borderRadius: 20,
    flexGrow: 1,
    backgroundColor: COLOURS.lightGreen,
    padding: 14,
  },
  tipsTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
});
