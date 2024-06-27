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
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";
import { useNavigation } from "@react-navigation/native";
import { useCustomerInfo } from "../../hooks/useCustomerInfo";

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
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useColourTheme();
  const insets = useSafeAreaInsets();
  const nowDateString = getCurrentDateLocal();
  const chosenDateString = useSelector((state) => state.diary.chosenDate);
  const chosenDiaryDay = useSelector((state) => state.diary.currentDiaryDay);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { customerInfo, error, loading } = useCustomerInfo();

  useEffect(() => {

    if (error) {
      setIsSubscribed(true) // Since were not sure and backend caps data anyway
    }

    if (!customerInfo) return;

    if (typeof customerInfo.entitlements.active["Pro"] !== "undefined") {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [customerInfo, error]);

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
  }, [diaryData, isSubscribed]);

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
      // Create placeholder week structure
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

      // Map actual diary data onto the placeholder week structure
      diaryDays.forEach((day) => {
        const dayDate = new Date(day.date);
        // THIS SHOULD WORK SINCE DAY DATE WILL BE like 00:000Z
        const formattedDate = day.date.split("T")[0];
        // const formattedDate = formatInTimeZone(dayDate, 'Europe/London', 'yyyy-MM-dd HH:mm:ssXXX').split(' ')[0] // 2014-10-25 06:46:20-04:00

        // Maybe only need isSameWeek?
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

      // if (!isSubscribed) {
      //   break;
      // }
    }

    if (!isSubscribed) {
      return [weeks[weeks.length - 1]];
    } else {
      console.log("RETURNING ALL WEEKS", JSON.stringify(weeks, null, 2));
      return weeks;
    }
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
    const index = weeksArray.findIndex((week) => {
      // Check if any day in the 'days' array of this week matches the target date
      return week.days.some((day) => day.date === getAnyDateLocal(targetDate));
    });

    return index; // Ensure the index is always within range
  }

  const hideBlur = isReduceTransparencyEnabled || theme === "dark";

  return (
    <BlurView
      intensity={hideBlur ? 0 : 80}
      key={theme + isReduceTransparencyEnabled} // Make sure this key doesnt cause performance problems
      tint={theme}
      style={{
        position: "absolute",
        zIndex: 3000,
        paddingTop: insets.top + 5,
        backgroundColor: hideBlur && themedColours.primaryBackground[theme],
      }}
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
              color: themedColours.primaryText[theme],
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
                color: themedColours.secondaryText[theme],
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
              color: themedColours.primary[theme],
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
        // onProgressChange={(offest) => {
        //   if (!isSubscribed && Object.is(offest, -0)) {
        //     // IF swipe right on zero index it shows 0
        //     // If swipe left it shows -0
        //     navigation.navigate("Paywall");
        //   }
        // }}
        onSnapToItem={(index) => {
          if (!isSubscribed && index === 0) {
            // TRY MAKE THIS LESS ANNOYING? more scroll pixels needed to trigger
            navigation.navigate("Paywall");
          }
          
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
