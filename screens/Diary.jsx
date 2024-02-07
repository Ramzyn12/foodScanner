import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
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

const windowWidth = Dimensions.get("window").width;

const Diary = ({ navigation }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    moment().startOf("isoWeek")
  );
  const carouselRef = useRef(null);

  const totalWeeks = 3;
  const [weeksData, setWeeksData] = useState(
    [...Array(totalWeeks)].map((_, i) => ({ id: i }))
  );
  const [currentIndex, setCurrentIndex] = useState(weeksData.length - 1); // Start at the last index

  // useEffect(() => {
  //   if (currentIndex <= 1) {
  //     // If we are at the second item or before
  //     prependWeeks(5); // Add more weeks at the start
  //   }
  // }, [currentIndex]);

  const prependWeeks = (additionalWeeksCount) => {
    console.log("prepending weeks");
    const newWeeks = [...Array(additionalWeeksCount)].map((_, i) => ({
      id: weeksData[0].id + i + 1,
    }));
    setWeeksData([...newWeeks.reverse(), ...weeksData]);
    setCurrentIndex(currentIndex + additionalWeeksCount); // Adjust current index to maintain the current view
  };

  const renderWeek = useCallback(
    ({ index }) => {
      const weekStart = currentWeekStart
        .clone()
        .subtract((totalWeeks - index - 1) * 7, "days");
      return (
        <View style={styles.weekHeaderContainer}>
          {[...Array(7)].map((_, i) => (
            <WeekDayProgress
              key={i}
              dayType={
                weekStart.clone().add(i, "days").isSame(moment(), "day")
                  ? "current"
                  : weekStart.clone().add(i, "days").isBefore(moment(), "day")
                  ? "past"
                  : "future"
              }
              date={weekStart.clone().add(i, "days")}
            />
          ))}
        </View>
      );
    },
    [currentWeekStart, weeksData]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Week Header */}
      {/* <View style={styles.weekHeaderContainer}>
      
        <WeekDayProgress dayType="past" />
        <WeekDayProgress dayType="past" />
        <WeekDayProgress dayType="current" />
        <WeekDayProgress dayType="future" />
        <WeekDayProgress dayType="future" />
        <WeekDayProgress dayType="future" />
        <WeekDayProgress dayType="future" />
      </View> */}

      <Carousel
        data={weeksData} // use the adjusted weeksData
        renderItem={renderWeek}
        loop={false}
        defaultIndex={weeksData.length - 1} // start at the current week
        ref={carouselRef}
        width={windowWidth}
        height={100}
        onSnapToItem={(index) => {
          // console.log("current index:", index);
          if (index < 1) Alert.alert("You need to pay");
          setCurrentIndex(index); // Update current index state
        }}
      />

      {/* Main page */}
      <ScrollView style={styles.mainSectionContainer}>
        <StreakCard />
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
  },
});
