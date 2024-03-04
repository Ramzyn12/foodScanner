import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  StatusBar,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { InteractionManager } from "react-native";
// import { BlurView } from 'expo-blur';

import WeekDayProgress from "../components/WeekDayProgress";
import Svg, { G, Path, ClipPath, Rect, Defs } from "react-native-svg";
import StreakCard from "../components/StreakCard";
import BenefitFactCard from "../components/BenefitFactCard";
import FoodDiary from "../components/FoodDiary";
import Carousel from "react-native-reanimated-carousel";
import moment from "moment"; // make sure moment is installed
import { BlurView } from "expo-blur";
import { useQuery } from "@tanstack/react-query";
import { getAllDiaryDays } from "../axiosAPI/diaryDayAPI";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;

const Diary = ({ navigation }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Initialized to 0 or any default you see fit
  const [weeksData, setWeeksData] = useState([]);
  const [streak, setStreak] = useState(0);
  const [token, setToken] = useState(null); // State to store the token

  // Effect to retrieve the token from AsyncStorage
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("firebaseToken");
      setToken(storedToken); // Set the retrieved token to state
    };

    fetchToken();
  }, []); 

  const { data } = useQuery({
    queryKey: ["AllDiaryDays"],
    queryFn: getAllDiaryDays,
    // retry: false,
    enabled: !!token
  });

  const calculateCurrentStreak = (diaryDays) => {
    // Ensure diaryDays are sorted by date in descending order (most recent first)

    let currentStreak = 0;
    let i = 1;

    // console.log(diaryDays);
    const sorted = [...diaryDays].reverse();

    while (i < sorted.length && sorted[i].score >= 80) {
      currentStreak++;
      i++;
    }

    return currentStreak;
  };

  useEffect(() => {
    if (data) {
      const processedWeeks = processDiaryDaysToWeeks(data);
      const streakNum = calculateCurrentStreak(data);
      setStreak(streakNum);
      setWeeksData(processedWeeks); // Assuming you've adapted the state to hold this structure
      // console.log(processedWeeks);
    }
  }, [data]); // Re-run when data changes

  const processDiaryDaysToWeeks = (diaryDays) => {
    // Object to hold weeks data, keyed by week start date
    const weeks = {};

    diaryDays.forEach((day) => {
      const dateMoment = moment(day.date);
      const weekStart = dateMoment
        .clone()
        .startOf("isoWeek")
        .format("YYYY-MM-DD");
      if (!weeks[weekStart]) {
        // Initialize the week with placeholders
        weeks[weekStart] = Array(7).fill({ score: "none", _id: null });
      }
      const dayOfWeek = dateMoment.isoWeekday() - 1; // moment's isoWeekday returns 1 for Monday, so adjust for array index
      weeks[weekStart][dayOfWeek] = { score: day.score, _id: day._id }; // Replace placeholder with actual data
    });

    // Convert weeks object to an array for rendering
    return Object.entries(weeks).map(([start, days]) => ({
      weekStart: start,
      days,
    }));
  };

  const determineDayType = (weekStart, dayIndex) => {
    const day = moment(weekStart).add(dayIndex, "days");
    if (day.isSame(moment(), "day")) {
      return "current";
    } else if (day.isBefore(moment(), "day")) {
      return "past";
    } else {
      return "future";
    }
  };

  const renderWeek = useCallback(
    ({ item }) => {
      // item is now a week object from your weeksData array
      return (
        <View style={styles.weekHeaderContainer}>
          {item.days.map((day, index) => (
            <WeekDayProgress
              key={index}
              dayType={determineDayType(item.weekStart, index)} // You'll need to implement determineDayType
              date={moment(item.weekStart).add(index, "days")}
              score={day.score}
            />
          ))}
        </View>
      );
    },
    [weeksData] // Make sure to include any other dependencies you might have
  );


  return (
    <SafeAreaView style={styles.container}>
      {/* Week Header */}
      <BlurView intensity={10} tint="systemThinMaterial"  style={{ position: "absolute", zIndex: 3000, paddingTop: 38 }}>
        <Carousel
          data={weeksData} // use the adjusted weeksData
          renderItem={renderWeek}
          loop={false}
          defaultIndex={weeksData.length - 1} // start at the current week
          ref={carouselRef}
          width={windowWidth}
          height={100}
          onSnapToItem={(index) => {
            if (index < weeksData.length - 2) Alert.alert("You need to pay");
            // carouselRef.current.scrollTo({ index: weeksData.length - 1 });
            // setCurrentIndex(weeksData.length - 1);
          }}
        />
      </BlurView>

      {/* Main page */}
      <ScrollView style={styles.mainSectionContainer}>
        <StreakCard streak={streak} />
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
    paddingBottom: 300,
    paddingTop: 120
  },
});
