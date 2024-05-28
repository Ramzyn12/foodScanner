import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";
import Shuttle from "../../svgs/Shuttle";
import ArrowRight from "../../svgs/ArrowRight";
import TimerCircle from "../../svgs/TimerCircle";
import { useNavigation } from "@react-navigation/native";
import { Svg, Path } from "react-native-svg";
import WeekOverviewLines from "../WeeklyOverview/WeekOverviewLines";
import { themedColours } from "../../constants/themedColours";
import { useColourTheme } from "../../context/Themed";

const TimelineEventCard = ({
  unlocked,
  data,
  destination,
  daysFinished,
  remainingDaysToUnlock,
}) => {
  const navigation = useNavigation();
  const { theme } = useColourTheme();
  const handleNavigateHealhWeek = () => {
    if (unlocked) {
      navigation.navigate(destination, {
        week: data?.week,
        title: data?.title,
      });
    }
  };

  const daysRemaining = 7 - daysFinished;
  const completed = daysRemaining <= 0;

  return (
    <Pressable
      onPress={handleNavigateHealhWeek}
      style={[
        styles.cardContainer,
        {
          backgroundColor: unlocked
            ? themedColours.tertiaryBackground[theme]
            : themedColours.primaryBackground[theme],
        },
        { borderWidth: unlocked ? 0 : 1, borderColor: themedColours.stroke[theme] },
      ]}
    >
      {/* Top Section when locked */}
      <View style={styles.cardTopContainer}>
        {/* Show when both locked and unlocked */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              marginBottom: 8,
              fontFamily: "Mulish_700Bold",
              fontSize: 16,
              color: themedColours.primaryText[theme],
            }}
          >
            {data?.title}
          </Text>
          <Text
            style={{
              marginBottom: 14,
              fontFamily: "Mulish_400Regular",
              fontSize: 14,
              color: themedColours.primaryText[theme],
            }}
          >
            {data?.subtitle}
          </Text>
          {unlocked && (
            <View style={{ paddingBottom: 16 }}>
              <WeekOverviewLines
                daysFinished={daysFinished + 1 || data?.currentDay}
              />
            </View>
          )}
          {unlocked && (
            <View
              style={[
                styles.tipsTextContainer,
                {
                  backgroundColor: completed
                    ? themedColours.primary[theme]
                    : themedColours.stroke[theme],
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Mulish_800ExtraBold",
                  color: completed
                    ? themedColours.primaryBackground[theme]
                    : themedColours.primaryText[theme],
                }}
              >
                {completed ? "Complete" : `${daysRemaining} days remaining`}
              </Text>
              {completed && (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                >
                  <Path
                    d="M11.7174 0.986761C11.8942 0.774623 11.8656 0.45934 11.6534 0.282558C11.4413 0.105776 11.126 0.134438 10.9492 0.346577L7.35544 4.65912C6.63355 5.52539 6.12573 6.13289 5.68526 6.53064C5.25507 6.91911 4.95818 7.04257 4.66667 7.04257C4.37516 7.04257 4.07827 6.91911 3.64808 6.53064C3.20761 6.13289 2.69979 5.52538 1.97789 4.65911L1.05078 3.54658C0.873998 3.33444 0.558715 3.30578 0.346577 3.48256C0.134438 3.65934 0.105776 3.97462 0.282558 4.18676L1.2354 5.33018C1.92558 6.15842 2.47831 6.8217 2.97788 7.27282C3.49392 7.73881 4.02143 8.04257 4.66667 8.04257C5.31191 8.04257 5.83942 7.73881 6.35546 7.27282C6.85503 6.82171 7.40774 6.15843 8.09791 5.3302L11.7174 0.986761Z"
                    fill={themedColours.primaryBackground[theme]}
                  />
                </Svg>
              )}
            </View>
          )}
        </View>

        <ArrowRight color={themedColours.primaryText[theme]} />
      </View>

      {!unlocked && (
        <View style={[styles.cardLockedMessage, {backgroundColor: themedColours.tertiaryBackground[theme]}]}>
          <TimerCircle color={themedColours.primaryText[theme]} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_600SemiBold",
              paddingVertical: 2,
              color: themedColours.primaryText[theme]
            }}
          >
            Unlock In {remainingDaysToUnlock} Days
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default TimelineEventCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    padding: 20,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: COLOURS.darkGreen,
  },
  iconContainer: {
    width: 60,
    height: 60,
    padding: 18,
    borderRadius: 12,
    backgroundColor: COLOURS.darkGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    borderRadius: 20,
    flexGrow: 1,
    backgroundColor: COLOURS.lightGreen,
    padding: 14,
  },
  cardTopContainer: { flexDirection: "row", gap: 14 },
  tipsTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    borderRadius: 40,
  },
  cardLockedMessage: {
    backgroundColor: COLOURS.lightGreen,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 8,
  },
});
