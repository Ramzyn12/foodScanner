import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Svg, { G, Path, ClipPath, Rect, Defs } from "react-native-svg";
import { Skeleton } from "moti/skeleton";
import TodayScore from "./TodayScore";
import FoodList from "./FoodList";
import { getDiaryDay } from "../../axiosAPI/diaryDayAPI";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../utils/MMKVStorage";
import { setCurrentDiaryDay } from "../../redux/diarySlice";
import { getCurrentDateLocal } from "../../utils/dateHelpers";
import LoadingDiary from "./LoadingDiary";
import ErrorPage from "../../screens/ErrorPage";
import { themedColours } from "../../constants/themedColours";
import { useColourTheme } from "../../context/Themed";

const FoodDiary = ({}) => {
  // const token = useSelector(state => state.auth.token)
  const token = storage.getString("firebaseToken");
  const userCreated = useSelector((state) => state.auth.userCreated);
  const chosenDate =
    useSelector((state) => state.diary.chosenDate) || getCurrentDateLocal();
  const waitingForBackendApple = useSelector(
    (state) => state.auth.waitingForBackend
  );
  const dispatch = useDispatch();
  const { theme } = useColourTheme();

  // Do we still need this when use waitingForBackend in mainComponent?
  useEffect(() => {
    if (userCreated) {
      refetch();
    }
  }, [userCreated]);

  const {
    data: diaryFoodItems,
    isError,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryFn: () => getDiaryDay({ date: chosenDate }),
    queryKey: ["DiaryDay", chosenDate],
    enabled: !!token,
    retry: false,
  });

  useEffect(() => {
    dispatch(setCurrentDiaryDay(diaryFoodItems));
  }, [diaryFoodItems]);

  const emptyFoodList =
    1 * diaryFoodItems?.consumedFoods.length +
      1 * diaryFoodItems?.consumedSingleFoods.length ===
    0;

  if (isError) {
    return <ErrorPage onPress={() => refetch()} />;
  }

  return (
    <View style={{ width: "100%", marginTop: 25, paddingBottom: 200 }}>
      {/* {!emptyFoodList && (
        <TodayScore score={diaryFoodItems?.score} />
      )} */}
      <FoodList
        loadingFoodDiary={isLoading}
        emptyFoodList={emptyFoodList}
        diaryFoodItems={diaryFoodItems}
        isErrorFoodDiary={isError}
      />
    </View>
  );
};

export default FoodDiary;
