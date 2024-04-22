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
import moment from "moment";
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

const windowWidth = Dimensions.get("window").width;

const transformCurrentDate = (date) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
  const day = daysOfWeek[date.getDay() - 1];
  const dayNumber = date.getDate();
  const month = Months[date.getMonth()];
  return `${day} ${dayNumber} ${month}`;
};

const WeekHeader = ({ diaryData, daysFinished }) => {
  const [weeksData, setWeeksData] = useState([]);
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const chosenDateString = useSelector((state) => state.diary.chosenDate);
  const chosenDiaryDay = useSelector((state) => state.diary.currentDiaryDay);
  const chosenDate = chosenDateString ? new Date(chosenDateString) : new Date();

  // THIS MAY BE WRONG? LOG IT WHEN NO DATA
  const diaryDayStateGood =
    chosenDiaryDay?.diaryDayState === "unprocessed" ||
    chosenDiaryDay?.fastedState;

  const subHeaderMessage = useMemo(() => {
    if (!chosenDiaryDay) {
      return "..."; // No diary day chosen yet
    }

    // Convert chosenDate string to a moment object
    const chosenMoment = moment(chosenDate);
    const today = moment().startOf("day");

    // Determine the state of the chosen diary day
    const isToday = chosenMoment.isSame(today, "day");
    const isPast = chosenMoment.isBefore(today, "day");

    if (isToday) {
      if (diaryDayStateGood) return "All good so far";
      if (!diaryDayStateGood) return "Failed";
    } else if (isPast) {
      if (diaryDayStateGood) return "Success";
      if (!diaryDayStateGood) return "Failed";
    }

    return "Failed"; // Covers all failed states or future dates
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
    dispatch(setChosenDate(moment().startOf("day").toISOString()));
    carouselRef.current.scrollTo({ index: weeksData.length - 1 });
  };

  //Maybe place this outside component so not rerendered
  const processDiaryDaysToWeeks = (diaryDays) => {
    // Use the first item in the array as the earliest date, assuming array is in ascending order
    const earliestDate = moment(diaryDays[0].date);
    const earliestDateUseable = diaryDays[0].date;
    const latestDate = moment(); // Use the current date as the latest date

    const weeks = [];
    let currentWeekStart = earliestDate.clone().startOf("isoWeek");

    while (currentWeekStart.isSameOrBefore(latestDate, "week")) {
      let week = Array(7)
        .fill(null)
        .map((_, index) => ({
          date: currentWeekStart
            .clone()
            .add(index, "days")
            .format("YYYY-MM-DD"),
          diaryDayState: "empty", // Default score
          _id: null, // Default ID
          fastedState: false,
        }));

      // Map actual diary data onto the week structure
      diaryDays.forEach((day) => {
        const dateMoment = moment(day.date);
        if (
          dateMoment.isSameOrAfter(currentWeekStart) &&
          dateMoment.isBefore(currentWeekStart.clone().add(1, "week"))
        ) {
          const dayOfWeek = dateMoment.isoWeekday() - 1; // Adjust for 0-indexed array
          week[dayOfWeek] = {
            diaryDayState: day.diaryDayState,
            _id: day._id,
            date: day.date,
            fastedState: day.fastedState,
          };
        }
      });

      weeks.push({
        weekStart: currentWeekStart.format("YYYY-MM-DD"),
        days: week,
        earliestDate: earliestDateUseable,
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

  const handleDayPressChange = (item, index) => {
    const pressedDate = moment(item.weekStart).add(index, "days");
    const currentDate = moment().startOf("day");
    const earliestMoment = moment(item.earliestDate);
    const pressedMoment = moment(pressedDate);

    if (earliestMoment.isAfter(pressedMoment)) {
      return;
    }

    // If pressedDate is after the current date, dispatch the current date instead
    if (pressedDate.isAfter(currentDate)) {
      dispatch(setChosenDate(currentDate.toISOString()));
    } else {
      dispatch(setChosenDate(pressedDate.toISOString()));
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
                date={moment(item.weekStart).add(index, "days")}
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

  console.log(weeksData);

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
            {diaryDayStateGood ? <GreenTickCircle /> : <GreyFail />}
            <Text
              style={{
                color: "#636566",
                fontSize: 11,
                fontFamily: "Mulish_700Bold",
              }}
            >
              {subHeaderMessage}
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
