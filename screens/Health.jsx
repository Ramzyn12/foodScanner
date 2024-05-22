import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import TimelineEvent from "../components/health/TimelineEvent";
import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllTimelineWeeks } from "../axiosAPI/timelineAPI";
import LoadingHealth from "../components/health/LoadingHealth";

const calculateWeekStatus = (daysSinceStart, weekIndex) => {
  const daysPassed = daysSinceStart - weekIndex * 7;
  const remainingDaysToUnlock = weekIndex * 7 - daysSinceStart;

  if (daysPassed >= 7) {
    return { daysFinished: 7, unlocked: true, remainingDaysToUnlock };
  } else if (daysPassed >= 0) {
    return { daysFinished: daysPassed, unlocked: true, remainingDaysToUnlock };
  } else {
    return {
      daysFinished: 0,
      unlocked: false,
      remainingDaysToUnlock: Math.max(remainingDaysToUnlock, 0),
    };
  }
};

const Health = () => {
  const {
    data: timelineWeeks,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getAllTimelineWeeks,
    queryKey: ["AllTimelineWeeks"],
    retry: 1,
  });

  if (isLoading) return <LoadingHealth />;
  if (isError)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Server Error, please try again later</Text>
      </View>
    );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.line}></View>
      {timelineWeeks?.timelineWeeks?.map((week, index) => {
        const { daysFinished, unlocked, remainingDaysToUnlock } =
          calculateWeekStatus(
            timelineWeeks.daysSinceStart,
            index,
            timelineWeeks.timelineWeeks.length
          );
        return (
          <TimelineEvent
            key={week._id}
            data={week}
            daysFinished={daysFinished}
            unlocked={unlocked}
            remainingDaysToUnlock={remainingDaysToUnlock}
          />
        );
      })}
    </ScrollView>
  );
};

export default Health;

const styles = StyleSheet.create({
  line: {
    width: 4,
    flex: 1,
    position: "absolute",
    backgroundColor: "#EEEEEE",
    left: 67,
    top: "-50%",
    height: "200%",
  },
});
