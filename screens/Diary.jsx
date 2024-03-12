import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import WeekDayProgress from "../components/diary/WeekDayProgress";
import StreakCard from "../components/diary/StreakCard";
import BenefitFactCard from "../components/shared/BenefitFactCard";
import FoodDiary from "../components/diary/FoodDiary";
import Carousel from "react-native-reanimated-carousel";
import moment from "moment"; // make sure moment is installed
import { BlurView } from "expo-blur";
import { useQuery } from "@tanstack/react-query";
import { getAllDiaryDays } from "../axiosAPI/diaryDayAPI";
import { useSelector } from "react-redux";
import WeekHeader from "../components/diary/WeekHeader";

const Diary = ({ navigation }) => {
  const userCreated = useSelector((state) => state.auth.userCreated);
  const token = useSelector((state) => state.auth.token);

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ["AllDiaryDays"],
    queryFn: getAllDiaryDays,
    retry: false,
    enabled: !!token,
  });

  useEffect(() => {
    if (userCreated) {
      refetch();
    }
  }, [userCreated]);

  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>error</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <WeekHeader diaryData={data} />

      {/* Main page */}
      <ScrollView style={styles.mainSectionContainer}>
        <StreakCard diaryData={data} />
        <BenefitFactCard />
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
    paddingTop: 120,
    paddingBottom: 300,
  },
});
