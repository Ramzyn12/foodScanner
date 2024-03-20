import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Svg, { G, Path, ClipPath, Rect, Defs } from "react-native-svg";

import TodayScore from "./TodayScore";
import FoodList from "./FoodList";
import { getDiaryDay } from "../../axiosAPI/diaryDayAPI";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const FoodDiary = () => {
  const token = useSelector(state => state.auth.token)
  const userCreated = useSelector((state) => state.auth.userCreated);
  const chosenDate = useSelector(state => state.diary.chosenDate)

  useEffect(() => {
    if (userCreated) {
      refetch()
    }
  }, [userCreated])

  const {
    data: diaryFoodItems,
    isError,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryFn: () => getDiaryDay({ date: chosenDate || new Date() }),
    // NEED TO ADD SECOND PARAM when fetching for different days 
    queryKey: ["DiaryDay", chosenDate], 
    enabled: !!token,
    retry: false
  });

  const emptyFoodList = (1*diaryFoodItems?.consumedFoods.length + 1*diaryFoodItems?.consumedSingleFoods.length) === 0

  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>{error.response.data.message}</Text>;

  return (
    <View style={{ width: "100%", marginTop: 25, marginBottom: 150 }}>
      {/* {!emptyFoodList && (
        <TodayScore score={diaryFoodItems?.score} />
      )} */}
      <FoodList emptyFoodList={emptyFoodList} diaryFoodItems={diaryFoodItems} />
    </View>
  );
};

export default FoodDiary;
