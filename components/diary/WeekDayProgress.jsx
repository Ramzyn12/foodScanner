import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Svg, { Path } from "react-native-svg";
import COLOURS from "../../constants/colours";
import CircularProgress from "./CircularProgress";
import { useSelector } from "react-redux";
import GreyFail from "../../svgs/GreyFail";
import { format } from "date-fns";
import { getCurrentDateLocal } from "../../utils/dateHelpers";

const WeekDayProgress = ({
  dayType,
  date,
  score,
  diaryDayState,
  fastedState,
  hasProcessed,
  earliestDate,
}) => {
  // This needs to be the local time, not setHours...
  const nowDateString = getCurrentDateLocal() // "YYYY-MM-DD"
  const chosenDate =
    useSelector((state) => state.diary.chosenDate) || nowDateString;
  const chosenDateObj = chosenDate ? new Date(chosenDate) : new Date(nowDateString);
  const thisDateObj = new Date(date);
  const [showUnderline, setShowUnderline] = useState(false);
  const isFasting = fastedState;

  // Change to date-fns is Before
  const beforeEarliest = new Date(date) < new Date(earliestDate);

  useEffect(() => {
    // Milliseconds of each, equal since start of day local time both cases
    if (chosenDateObj.getTime() === thisDateObj.getTime()) {
      setShowUnderline(true);
    } else {
      setShowUnderline(false);
    }
  }, [chosenDate, thisDateObj]);

  return (
    <View
      style={[
        styles.weekDayContainer,
        showUnderline && {
          borderBottomWidth: 4,
          borderBottomColor: "#126668",
        },
      ]}
    >
      <View style={styles.weekDayTop}>
        <Text
          style={[
            styles.weekDayText,
            dayType === "current" && { color: COLOURS.darkGreen },
          ]}
        >
          {format(new Date(date), "eee").toUpperCase()}{" "}
          {/* Format day of the week */}
        </Text>
        <Text
          style={[
            styles.weekDayNumber,
            dayType === "current" && { color: COLOURS.darkGreen },
          ]}
        >
          {new Date(date).getDate()} {/* Get day of the month */}
        </Text>
      </View>
      {dayType === "past" && diaryDayState === "unprocessed" && (
        <View style={styles.progressCirclePast}>
          <Svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <Path
              d="M14.861 1.73344C15.082 1.46827 15.0461 1.07417 14.781 0.85319C14.5158 0.632213 14.1217 0.66804 13.9007 0.933213L9.40847 6.32389C8.5061 7.40673 7.87132 8.16611 7.32074 8.66329C6.783 9.14887 6.41189 9.3032 6.0475 9.3032C5.68312 9.3032 5.31201 9.14887 4.77426 8.66329C4.22368 8.16611 3.5889 7.40672 2.68653 6.32389L1.52764 4.93321C1.30666 4.66804 0.912559 4.63221 0.647386 4.85319C0.382213 5.07417 0.346385 5.46827 0.567363 5.73344L1.75842 7.16271C2.62114 8.19801 3.31205 9.02712 3.93652 9.59102C4.58156 10.1735 5.24095 10.5532 6.0475 10.5532C6.85405 10.5532 7.51344 10.1735 8.15849 9.59102C8.78295 9.02713 9.47384 8.19803 10.3366 7.16274L14.861 1.73344Z"
              fill="white"
            />
          </Svg>
        </View>
      )}
      {dayType === "past" && diaryDayState === "processed" && (
        // <CircularProgress progress={score} />
        <GreyFail crossSize={13} circleSize={30} />
      )}
      {dayType === "past" &&
        diaryDayState === "empty" &&
        !isFasting &&
        beforeEarliest && <View style={styles.progressCircleFuture}></View>}
      {dayType === "past" &&
        diaryDayState === "empty" &&
        !isFasting &&
        !beforeEarliest && <GreyFail crossSize={13} circleSize={30} />}
      {dayType === "past" && diaryDayState === "empty" && isFasting && (
        <View style={styles.progressCirclePast}>
          <Svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <Path
              d="M14.861 1.73344C15.082 1.46827 15.0461 1.07417 14.781 0.85319C14.5158 0.632213 14.1217 0.66804 13.9007 0.933213L9.40847 6.32389C8.5061 7.40673 7.87132 8.16611 7.32074 8.66329C6.783 9.14887 6.41189 9.3032 6.0475 9.3032C5.68312 9.3032 5.31201 9.14887 4.77426 8.66329C4.22368 8.16611 3.5889 7.40672 2.68653 6.32389L1.52764 4.93321C1.30666 4.66804 0.912559 4.63221 0.647386 4.85319C0.382213 5.07417 0.346385 5.46827 0.567363 5.73344L1.75842 7.16271C2.62114 8.19801 3.31205 9.02712 3.93652 9.59102C4.58156 10.1735 5.24095 10.5532 6.0475 10.5532C6.85405 10.5532 7.51344 10.1735 8.15849 9.59102C8.78295 9.02713 9.47384 8.19803 10.3366 7.16274L14.861 1.73344Z"
              fill="white"
            />
          </Svg>
        </View>
      )}
      {dayType === "future" && (
        <View style={styles.progressCircleFuture}></View>
      )}
      {dayType === "current" && diaryDayState === "processed" && (
        <GreyFail crossSize={13} circleSize={30} />
      )}
      {dayType === "current" &&
        (diaryDayState === "empty" || diaryDayState === "unprocessed") && (
          <View style={styles.progressCircleFuture}></View>
        )}
    </View>
  );
};

export default WeekDayProgress;

const styles = StyleSheet.create({
  weekDayContainer: {
    alignItems: "center",
    padding: 8,
    gap: 10,
  },

  weekDayTop: {
    alignItems: "center",
    gap: 2,
  },
  weekDayText: {
    fontFamily: "Lato_700Bold",
    fontSize: 11,
  },
  weekDayNumber: {
    fontFamily: "Lato_700Bold",
    fontSize: 11,
  },
  progressCirclePast: {
    width: 30,
    height: 30,
    backgroundColor: COLOURS.darkGreen,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  progressCircleFuture: {
    width: 30,
    height: 30,
    backgroundColor: COLOURS.lightGray,
    borderRadius: 30,
  },
});
