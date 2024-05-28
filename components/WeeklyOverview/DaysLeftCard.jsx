import { View, Text } from "react-native";
import React from "react";
import WeekOverviewLines from "./WeekOverviewLines";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const DaysLeftCard = ({ week, daysPassed, description }) => {
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
  const { theme } = useColourTheme();

  return (
    <View
      style={{
        padding: 20,
        marginBottom: 14,
        gap: 14,
        backgroundColor: themedColours.tertiaryBackground[theme],
        borderRadius: 20,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 11,
            fontFamily: "Mulish_800ExtraBold",
            color: themedColours.secondaryText[theme],
          }}
        >
          DAY {daysPassed < week * 7 ? daysPassed + 1 : week * 7}
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontFamily: "Mulish_800ExtraBold",
            color: themedColours.secondaryText[theme],
          }}
        >
          {7 - day > 0 ? `${7 - day} days remaining` : "Completed"}
        </Text>
      </View>
      <WeekOverviewLines daysFinished={day + 1} />
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Mulish_400Regular",
          color: themedColours.primaryText[theme],
        }}
      >
        {description}
      </Text>
    </View>
  );
};

export default DaysLeftCard;
