import { View, Text, Pressable, Alert } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import Carousel from "react-native-reanimated-carousel";
import WeekDayProgress from "./WeekDayProgress";
import { Dimensions } from "react-native";
import moment from "moment";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setChosenDate } from "../../redux/diarySlice";
const windowWidth = Dimensions.get("window").width;

const WeekHeader = ({ diaryData }) => {
  const [weeksData, setWeeksData] = useState([]);
  const carouselRef = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    if (diaryData) {
      const processedWeeks = processDiaryDaysToWeeks(diaryData);
      setWeeksData(processedWeeks);
    }
  }, [diaryData]);

  //Maybe place this outside component so not rerendered
  const processDiaryDaysToWeeks = (diaryDays) => {
    // Use the first item in the array as the earliest date, assuming array is in ascending order
    const earliestDate = moment(diaryDays[0].date);
    const latestDate = moment(); // Use the current date as the latest date

    const weeks = [];
    let currentWeekStart = earliestDate.clone().startOf("isoWeek");

    while (currentWeekStart.isSameOrBefore(latestDate, 'week')) {
      let week = Array(7).fill(null).map((_, index) => ({
        date: currentWeekStart.clone().add(index, "days").format("YYYY-MM-DD"),
        score: undefined, // Default score
        _id: null // Default ID
      }));

      // Map actual diary data onto the week structure
      diaryDays.forEach((day) => {
        const dateMoment = moment(day.date);
        if (dateMoment.isSameOrAfter(currentWeekStart) && dateMoment.isBefore(currentWeekStart.clone().add(1, "week"))) {
          const dayOfWeek = dateMoment.isoWeekday() - 1; // Adjust for 0-indexed array
          week[dayOfWeek] = { score: day.score, _id: day._id, date: day.date };
        }
      });

      weeks.push({
        weekStart: currentWeekStart.format("YYYY-MM-DD"),
        days: week
      });

      // Proceed to the next week
      currentWeekStart.add(1, "week");
    }

    return weeks;
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
    ({ item, index }) => {
      // item is a week object from your weeksData array (cant change name)
      return (
        <View style={styles.weekHeaderContainer}>
          {item.days.map((day, index) => (
            <Pressable key={index} onPress={() => dispatch(setChosenDate(moment(item.weekStart).add(index, "days").toISOString()))}>
              <WeekDayProgress
              dayType={determineDayType(item.weekStart, index)}
              date={moment(item.weekStart).add(index, "days")}
              score={day.score}
            />
            </Pressable>
            
          ))}
        </View>
      );
    },
    [weeksData]
  );

  return (
    <BlurView
      intensity={30}
      tint='systemThickMaterial'
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
          // if (index < weeksData.length - 2) Alert.alert("You need to pay");
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
