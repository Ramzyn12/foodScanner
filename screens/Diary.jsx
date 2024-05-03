import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
  Pressable,
  AppState,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import WeekDayProgress from "../components/diary/WeekDayProgress";
import StreakCard from "../components/diary/StreakCard";
import BenefitFactCard from "../components/shared/BenefitFactCard";
import FoodDiary from "../components/diary/FoodDiary";
import Carousel from "react-native-reanimated-carousel";
// import moment from "moment"; // make sure moment is installed
import { BlurView } from "expo-blur";
import { focusManager, useQuery } from "@tanstack/react-query";
import { getAllDiaryDays } from "../axiosAPI/diaryDayAPI";
import { useSelector } from "react-redux";
import WeekHeader from "../components/diary/WeekHeader";
import TimelineEventCard from "../components/health/TimelineEventCard";
import { storage } from "../utils/MMKVStorage";
import { getRecentTimelineWeek } from "../axiosAPI/timelineAPI";
import { getCurrentDateLocal } from "../utils/dateHelpers";
import { useFocusNotifyOnChangeProps } from "../hooks/useFocusNotifyOnChangeProps";

const Diary = ({ navigation }) => {
  const userCreated = useSelector((state) => state.auth.userCreated);
  // const token = useSelector((state) => state.auth.token);
  const token = storage.getString("firebaseToken");
  // const currentFood = useSelector((state) => state.food.currentFood);
  // const notifyOnChangeProps = useFocusNotifyOnChangeProps()

  // focusManager.setFocused(true);

  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ["AllDiaryDays"],
    queryFn: getAllDiaryDays,
    retry: false,
    enabled: !!token,
  });

  const {
    data: recentTimelineWeekData,
    dataUpdatedAt,
    isFetching,
    isStale,
  } = useQuery({
    queryKey: ["RecentTimelineWeek"],
    queryFn: getRecentTimelineWeek,
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: !!token,
    // refetchOnMount: false,
    // retryOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
  });

  useEffect(() => {
    if (userCreated) {
      refetch();
    }
  }, [userCreated]);

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "yellow",
        }}
      >
        <Text style={{ fontSize: 34 }}>Loading diary screen data</Text>
      </View>
    );
  if (isError)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Server error, try again later</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <WeekHeader
        daysFinished={recentTimelineWeekData?.currentDay}
        diaryData={data}
      />

      {/* Main page */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainSectionContainer}
      >
        <StreakCard diaryData={data} />
        {/* <BenefitFactCard /> */}
        <Pressable style={{ marginTop: 25 }}>
          <TimelineEventCard
            destination={"HealthStack"}
            unlocked={true}
            data={recentTimelineWeekData}
            daysFinished={recentTimelineWeekData?.currentDay}
          />
        </Pressable>
        <FoodDiary />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Diary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  weekHeaderContainer: {
    paddingHorizontal: 18,
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainSectionContainer: {
    padding: 18,
    flex: 1,
    paddingTop: 150,
  },
});
