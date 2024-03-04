import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Svg, { G, Path, ClipPath, Rect, Defs } from "react-native-svg";

import TodayScore from "./TodayScore";
import FoodList from "./FoodList";
import { getDiaryDay } from "../axiosAPI/diaryDayAPI";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FoodDiary = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("firebaseToken");
      setToken(storedToken);
    };

    fetchToken();
  }, []);

  const {
    data: foodItems,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getDiaryDay({ date: new Date() }),
    queryKey: ["DiaryDay"], //MIGHT NEED TO ADD SECOND PARAM
    enabled: !!token,
    // retry: false,
  });

  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>{error.response.data.message}</Text>;

  return (
    <View style={{ width: "100%", marginTop: 25, marginBottom: 60 }}>
      {foodItems?.consumedFoods.length > 0 && <TodayScore score={foodItems?.score} />}
      {/* MAYBE USE SCROLLVIEW OR FLATLIST!! */}
      <FoodList foodItems={foodItems} />
    </View>
  );
};

export default FoodDiary;
