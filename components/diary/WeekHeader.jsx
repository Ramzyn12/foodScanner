import { View, Text } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import Carousel from "react-native-reanimated-carousel";
import WeekDayProgress from "./WeekDayProgress";
import { Dimensions } from "react-native";
import moment from "moment";
import { StyleSheet } from "react-native";
const windowWidth = Dimensions.get("window").width;

const WeekHeader = ({ diaryData }) => {
  const [weeksData, setWeeksData] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (diaryData) {
      const processedWeeks = processDiaryDaysToWeeks(diaryData);
      setWeeksData(processedWeeks);
    }
  }, [diaryData]);

  //Maybe place this outside component so not rerendered
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
      weeks[weekStart][dayOfWeek] = { score: day.score, _id: day._id };
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
      // item is a week object from your weeksData array (cant change name)
      return (
        <View style={styles.weekHeaderContainer}>
          {item.days.map((day, index) => (
            <WeekDayProgress
              key={index}
              dayType={determineDayType(item.weekStart, index)}
              date={moment(item.weekStart).add(index, "days")}
              score={day.score}
            />
          ))}
        </View>
      );
    },
    [weeksData]
  );

  return (
    <BlurView
      intensity={10}
      tint="systemThinMaterial"
      style={{ position: "absolute", zIndex: 3000, paddingTop: 38 }}
    >
      <Carousel
        data={weeksData}
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
  );
};

export default WeekHeader;

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
