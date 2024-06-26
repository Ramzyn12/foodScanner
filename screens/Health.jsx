import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useCallback } from "react";
import TimelineEvent from "../components/health/TimelineEvent";
import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllTimelineWeeks } from "../axiosAPI/timelineAPI";
import LoadingHealth from "../components/health/LoadingHealth";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";
import ErrorPage from "./ErrorPage";

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
    refetch,
    isError,
  } = useQuery({
    queryFn: getAllTimelineWeeks,
    queryKey: ["AllTimelineWeeks"],
    retry: 1,
  });

  const { theme } = useColourTheme();

  const renderItem = useCallback(({ item, index }) => {
    const { daysFinished, unlocked, remainingDaysToUnlock } = calculateWeekStatus(
      timelineWeeks.daysSinceStart,
      index
    );
    return (
      <TimelineEvent
        key={item._id}
        data={item}
        daysFinished={daysFinished}
        unlocked={unlocked}
        remainingDaysToUnlock={remainingDaysToUnlock}
      />
    );
  }, [timelineWeeks]);

  if (isLoading) return <LoadingHealth />;
  if (isError) return <ErrorPage onPress={() => refetch()} />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themedColours.primaryBackground[theme],
      }}
    >
      <View
        style={[styles.line, { backgroundColor: themedColours.stroke[theme] }]}
      ></View>
      <FlatList
        data={timelineWeeks?.timelineWeeks}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 40 }} // Optional: to give some padding at the bottom
      />
    </View>
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
