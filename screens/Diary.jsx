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
import { getAllDiaryDays, getDiaryDay } from "../axiosAPI/diaryDayAPI";
import { useSelector } from "react-redux";
import WeekHeader from "../components/diary/WeekHeader";
import TimelineEventCard from "../components/health/TimelineEventCard";
import { storage } from "../utils/MMKVStorage";
import { getRecentTimelineWeek } from "../axiosAPI/timelineAPI";
import { getCurrentDateLocal } from "../utils/dateHelpers";
import { useFocusNotifyOnChangeProps } from "../hooks/useFocusNotifyOnChangeProps";
import { useFocusEffect } from "@react-navigation/native";
import LoadingDiary from "../components/diary/LoadingDiary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../hooks/useTheme";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";
import ErrorPage from "./ErrorPage";

const Diary = ({ navigation }) => {
  const userCreated = useSelector((state) => state.auth.userCreated);
  // const token = useSelector((state) => state.auth.token);
  const { theme } = useColourTheme();
  const token = storage.getString("firebaseToken");
  const firstTimeRef = useRef(true);
  const waitingForBackendApple = useSelector(
    (state) => state.auth.waitingForBackend
  ); // const currentFood = useSelector((state) => state.food.currentFood);
  // const notifyOnChangeProps = useFocusNotifyOnChangeProps()
  const chosenDate =
    useSelector((state) => state.diary.chosenDate) || getCurrentDateLocal();

  // focusManager.setFocused(true);

  const {
    data,
    refetch: refetchAllDiaryDays,
    isPending: isLoadingAllDiaryDays,
    isError: isErrorAllDiaryDays,
    error,
  } = useQuery({
    queryKey: ["AllDiaryDays"],
    queryFn: getAllDiaryDays,
    retry: false,
    enabled: !!token,
  });

  const {
    data: recentTimelineWeekData,
    isPending: isLoadingRecentTimeline,
    isError: isErrorRecentWeek,
    refetch: refetchRecentWeek,
  } = useQuery({
    queryKey: ["RecentTimelineWeek"],
    queryFn: getRecentTimelineWeek,
    staleTime: 1000 * 60 * 60 * 2, // 2 hour
    gcTime: 1000 * 60 * 60 * 2,
    enabled: !!token,
  });

  // see if can remove this? Try login apple
  useEffect(() => {
    if (userCreated) {
      refetchAllDiaryDays();
      refetchRecentWeek();
    }
  }, [userCreated]);

  // Refetches all diary days on each mount
  // useFocusEffect(
  //   useCallback(() => {
  //     if (firstTimeRef.current) {
  //       firstTimeRef.current = false;
  //       return;
  //     }
  //     refetchAllDiaryDays();
  //   }, [refetchAllDiaryDays])
  // );

  if (isLoadingAllDiaryDays || isLoadingRecentTimeline) return <LoadingDiary />;

  if (isErrorAllDiaryDays) {
    return (
      <ErrorPage
        onPress={() => {
          refetchAllDiaryDays();
          refetchRecentWeek();
        }}
      />
    );
  }

  console.log(
    isLoadingAllDiaryDays,
    "DIARY DAYS",
    isLoadingRecentTimeline,
    "TIMELINE"
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themedColours.primaryBackground[theme] },
      ]}
    >
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
        {!isErrorRecentWeek && (
          <Pressable style={{ marginTop: 25 }}>
            <TimelineEventCard
              destination={"HealthStack"}
              unlocked={true}
              data={recentTimelineWeekData}
              daysFinished={recentTimelineWeekData?.currentDay}
            />
          </Pressable>
        )}
        <FoodDiary />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Diary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
