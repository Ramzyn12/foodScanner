import { View, Text, Pressable, Alert } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BlurView } from "expo-blur";
import Carousel from "react-native-reanimated-carousel";
import WeekDayProgress from "./WeekDayProgress";
import { Dimensions } from "react-native";
// import moment from "moment";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setChosenDate } from "../../redux/diarySlice";
import { AccessibilityInfo } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLOURS from "../../constants/colours";
import TickIcon from "../../svgs/TickIcon";
import { Svg, Path } from "react-native-svg";
import GreenTickCircle from "../../svgs/GreenTickCircle";
import GreyFail from "../../svgs/GreyFail";
import {
  addDays,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameWeek,
  startOfDay,
  startOfWeek,
  toDate,
} from "date-fns";
import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";
import { getAnyDateLocal, getCurrentDateLocal } from "../../utils/dateHelpers";

const windowWidth = Dimensions.get("window").width;

const transformCurrentDate = (date) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const Months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = daysOfWeek[date.getDay()];
  const dayNumber = date.getDate();
  const month = Months[date.getMonth()];
  return `${day} ${dayNumber} ${month}`;
};

const WeekHeader = ({ diaryData, daysFinished }) => {
  const [weeksData, setWeeksData] = useState([]);
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const nowDateString = getCurrentDateLocal();
  const chosenDateString = useSelector((state) => state.diary.chosenDate);
  const chosenDiaryDay = useSelector((state) => state.diary.currentDiaryDay);

  // Has to be date for date-fns to work below
  const chosenDate = chosenDateString
    ? new Date(chosenDateString)
    : new Date(nowDateString);

  // THIS MAY BE WRONG? LOG IT WHEN NO DATA
  const diaryDayStateGood =
    chosenDiaryDay?.diaryDayState === "unprocessed" ||
    chosenDiaryDay?.fastedState;

  const subHeaderInfo = useMemo(() => {
    // if (!chosenDiaryDay) {
    //   return { message: "", svg: "" }; // No diary day chosen yet
    // }

    const today = new Date(getCurrentDateLocal());
    const isToday = isSameDay(chosenDate, today);
    const isPast = isBefore(chosenDate, today);

    if (isToday) {
      if (diaryDayStateGood || chosenDiaryDay?.diaryDayState === "empty")
        return { message: "All good so far", svg: <GreenTickCircle /> };
      if (!diaryDayStateGood && chosenDiaryDay?.diaryDayState !== "empty")
        return { message: "Failed", svg: <GreyFail /> };
    } else if (isPast) {
      if (diaryDayStateGood) {
        return { message: "Success", svg: <GreenTickCircle /> };
      }
      if (!diaryDayStateGood) {
        return { message: "Failed", svg: <GreyFail /> };
      }
    }

    return { message: "Failed", svg: <GreyFail /> }; // Covers all failed states or future dates
  }, [chosenDiaryDay, chosenDate]);

  const date = transformCurrentDate(chosenDate);

  const [isReduceTransparencyEnabled, setIsReduceTransparencyEnabled] =
    useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceTransparencyEnabled().then((isEnabled) => {
      setIsReduceTransparencyEnabled(isEnabled);
    });
  }, []);

  useEffect(() => {
    if (diaryData) {
      const processedWeeks = processDiaryDaysToWeeks(diaryData);
      setWeeksData(processedWeeks);
    }
  }, [diaryData]);

  const handleGoToRecentDayPress = () => {
    dispatch(setChosenDate(nowDateString));
    carouselRef.current.scrollTo({ index: weeksData.length - 1 });
  };

  //Maybe place this outside component so not rerendered
  const processDiaryDaysToWeeks = (diaryDays) => {
    // Use the first item in the array as the earliest date, assuming array is in ascending order
    // const earliestDateUseable = diaryDays[0].date;
    const earliestDate = getAnyDateLocal(diaryDays[0].date);
    const latestDate = getAnyDateLocal(nowDateString); // Current date as the latest date

    const weeks = [];
    let currentWeekStart = startOfWeek(earliestDate, { weekStartsOn: 1 }); // ISO week starts on Monday
    let currentWeekStartLocal = getAnyDateLocal(currentWeekStart);

    while (
      isSameWeek(currentWeekStartLocal, latestDate, { weekStartsOn: 1 }) ||
      isBefore(currentWeekStartLocal, latestDate)
    ) {
      let week = Array(7)
        .fill(null)
        .map((_, index) => {
          return {
            date: format(addDays(currentWeekStartLocal, index), "yyyy-MM-dd"),
            diaryDayState: "empty", // Default state
            _id: null, // Default ID
            fastedState: false,
          };
        });

      // Map actual diary data onto the week structure
      diaryDays.forEach((day) => {
        const dayDate = new Date(day.date);
        // THIS SHOULD WORK SINCE DAY DATE WILL BE like 00:000Z
        const formattedDate = day.date.split("T")[0];
        // const formattedDate = formatInTimeZone(dayDate, 'Europe/London', 'yyyy-MM-dd HH:mm:ssXXX').split(' ')[0] // 2014-10-25 06:46:20-04:00

        if (
          isSameWeek(dayDate, currentWeekStartLocal, { weekStartsOn: 1 }) &&
          isBefore(dayDate, addDays(currentWeekStartLocal, 7))
        ) {
          const dayOfWeek = (dayDate.getDay() + 6) % 7;
          week[dayOfWeek] = {
            diaryDayState: day.diaryDayState,
            _id: day._id,
            date: formattedDate,
            fastedState: day.fastedState,
          };
        }
      });

      weeks.push({
        weekStart: format(currentWeekStartLocal, "yyyy-MM-dd"),
        days: week,
        earliestDate: diaryDays[0].date.split("T")[0],
      });

      // Proceed to the next week
      currentWeekStartLocal = getAnyDateLocal(
        addDays(currentWeekStartLocal, 7)
      );
    }

    // console.log(weeks, "WEEKS");

    return weeks;
  };

  const determineDayType = (weekStart, dayIndex) => {
    const day = addDays(new Date(weekStart), dayIndex);
    const today = new Date(nowDateString); // Consider using startOfDay if the time matters

    if (isSameDay(day, today)) {
      return "current";
    } else if (isBefore(day, today)) {
      return "past";
    } else {
      return "future";
    }
  };

  const handleDayPressChange = (item, index) => {
    const pressedDate = addDays(new Date(item.weekStart), index);
    const currentDate = new Date(nowDateString); // Get the start of today, trimming time part
    const earliestDate = new Date(item.earliestDate);

    if (isAfter(earliestDate, pressedDate)) {
      return; // If the earliest date is after the pressed date, do nothing
    }

    // If pressedDate is after the current date, dispatch the current date instead
    if (isAfter(pressedDate, currentDate)) {
      dispatch(setChosenDate(currentDate.toISOString().split("T")[0]));
    } else {
      dispatch(setChosenDate(pressedDate.toISOString().split("T")[0]));
    }
  };

  const renderWeek = useCallback(
    ({ item, index }) => {
      // item is a week object from your weeksData array (cant change name)

      return (
        <View style={styles.weekHeaderContainer}>
          {item.days.map((day, index) => (
            <Pressable
              key={index}
              onPress={() => handleDayPressChange(item, index)}
            >
              <WeekDayProgress
                dayType={determineDayType(item.weekStart, index)}
                // date={moment(item.weekStart).add(index, "days")}
                date={
                  addDays(new Date(item.weekStart), index)
                    .toISOString()
                    .split("T")[0]
                } // or day.date?
                // date={day.date} // or day.date?
                score={day.score}
                diaryDayState={day.diaryDayState}
                fastedState={day.fastedState}
                earliestDate={item.earliestDate}
              />
            </Pressable>
          ))}
        </View>
      );
    },
    [weeksData]
  );

  function findWeekIndexByDate(weeksArray, targetDate) {
    // Loop through the array of weeks
    return weeksArray.findIndex((week) => {
      // Check if any day in the 'days' array of this week matches the target date
      return week.days.some((day) => day.date === getAnyDateLocal(targetDate));
    });
  }

  return (
    <BlurView
      intensity={isReduceTransparencyEnabled ? 10 : 70}
      tint={
        isReduceTransparencyEnabled ? "systemThickMaterialLight" : "default"
      }
      style={{ position: "absolute", zIndex: 3000, paddingTop: insets.top + 5 }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 18,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <View style={{ gap: 6 }}>
          <Text
            style={{
              color: COLOURS.nearBlack,
              fontSize: 19,
              fontFamily: "Mulish_700Bold",
            }}
          >
            {date}
          </Text>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            {subHeaderInfo.svg}
            <Text
              style={{
                color: "#636566",
                fontSize: 11,
                fontFamily: "Mulish_700Bold",
              }}
            >
              {subHeaderInfo.message}
            </Text>
          </View>
        </View>
        <Pressable hitSlop={30} onPress={handleGoToRecentDayPress}>
          <Text
            style={{
              fontFamily: "Mulish_700Bold",
              fontSize: 14,
              color: COLOURS.darkGreen,
            }}
          >
            Today
          </Text>
        </Pressable>
      </View>
      <Carousel
        data={weeksData}
        renderItem={renderWeek}
        loop={false}
        // defaultIndex={weeksData.length - 1} // start at the current week
        defaultIndex={findWeekIndexByDate(weeksData, chosenDate)}
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
