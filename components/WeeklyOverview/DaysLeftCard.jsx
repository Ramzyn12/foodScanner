import { View, Text } from "react-native";
import React from "react";
import WeekOverviewLines from "./WeekOverviewLines";

const DaysLeftCard = ({ week, daysPassed }) => {
  const getdaysPassedForWeek = (week, daysSinceStart) => {
    const daysPassed = daysSinceStart - (week - 1) * 7;

    if (daysPassed >= 7) {
      return 7;
    } else if (daysPassed > 0) {
      return daysPassed;
    } else {
      return 0;
    }
  };

  const day = getdaysPassedForWeek(week, daysPassed);

  return (
    <View
      style={{
        padding: 20,
        marginBottom: 14,
        gap: 14,
        backgroundColor: "#F7F6EF",
        borderRadius: 20,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 11,
            fontFamily: "Mulish_800ExtraBold",
            color: "#636566",
          }}
        >
          DAY {day}
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontFamily: "Mulish_800ExtraBold",
            color: "#636566",
          }}
        >
          {7 - day} days remaining
        </Text>
      </View>
      <WeekOverviewLines daysFinished={day} />
    </View>
  );
};

export default DaysLeftCard;
