import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import ArrowRight from "../../svgs/ArrowRight";
import { CartesianChart, useAreaPath, useLinePath } from "victory-native";
import COLOURS from "../../constants/colours";
import { Group, LinearGradient, Path, vec } from "@shopify/react-native-skia";
import HealthBar from "./HealthBar";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRecentMetric } from "../../axiosAPI/healthMetricAPI";
import {
  format,
  formatDistance,
  formatDistanceToNow,
  formatRelative,
  parseISO,
  subDays,
} from "date-fns";
import { getCurrentDateLocal } from "../../utils/dateHelpers";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 - i,
  highTmp: 40 + 30 - i,
}));

const calculateBarProgress = (progress) => {
  let barOneRange = 33; // each bar represents 33 percent range
  let barTwoRange = 66;
  let barThreeRange = 100;

  let barOneProgress = Math.min(100, (progress / barOneRange) * 100);
  let barTwoProgress =
    progress > barOneRange
      ? Math.min(
          100,
          ((progress - barOneRange) / (barTwoRange - barOneRange)) * 100
        )
      : 0;
  let barThreeProgress =
    progress > barTwoRange
      ? Math.min(
          100,
          ((progress - barTwoRange) / (barThreeRange - barTwoRange)) * 100
        )
      : 0;

  return { barOneProgress, barTwoProgress, barThreeProgress };
};

const getLastLoggedText = (isoDateString) => {
  if (!isoDateString) return null;

  const date = parseISO(isoDateString);
  const today = new Date(getCurrentDateLocal());

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date >= today) {
    return "Today";
  } else if (date >= yesterday && date < today) {
    return "Yesterday";
  } else {
    return `${formatDistanceToNow(date)} ago`;
  }
};

const HealthCard = ({ onLog, metricType, leftLable, rightLable }) => {
  const navigation = useNavigation();
  const isWeight = metricType === "Weight";
  const {theme} = useColourTheme()

  const { data, isError, error } = useQuery({
    // Better name would be getHealthMetric
    queryFn: () => getRecentMetric({ metric: metricType }),
    retry: false,
    queryKey: ["RecentMetric", metricType], //Second param is the metric
  });

  const { barOneProgress, barTwoProgress, barThreeProgress } =
    calculateBarProgress(data?.metricValue ? data?.metricValue * 10 : 0);
  const lastLoggedText = getLastLoggedText(data?.date);
  const isLastLoggedToday = lastLoggedText === "Today";

  return (
    <Pressable
      onPress={() => navigation.navigate("HealthStatInfo", { metricType })}
      style={{
        borderWidth: 1,
        borderColor: themedColours.stroke[theme],
        borderRadius: 20,
        padding: 14,
        gap: 20,
      }}
    >
      <View style={{ gap: 20 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Mulish_700Bold",
              color: themedColours.primaryText[theme],
              fontSize: 16,
            }}
          >
            {metricType}
          </Text>
          <ArrowRight color={themedColours.primaryText[theme]} />
        </View>
        {lastLoggedText && (
          <View style={{ flexDirection: "row", gap: 2 }}>
            <Text
              style={{
                fontFamily: "Mulish_400Regular",
                color: themedColours.secondaryText[theme],
                fontSize: 14,
              }}
            >
              Last Logged:
            </Text>
            <Text
              style={{
                fontFamily: "Mulish_700Bold",
                color: themedColours.secondaryText[theme],
                fontSize: 14,
              }}
            >
              {lastLoggedText}
            </Text>
          </View>
        )}
      </View>
      {isWeight && (
        <View style={{ flexDirection: "row", gap: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text
              style={{
                fontSize: 50,
                fontFamily: "700Mulish_Bold",
                color: themedColours.primaryText[theme],
              }}
            >
              {data?.metricValue}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontFamily: "700Mulish_Bold",
                color: themedColours.primaryText[theme],
              }}
            >
              {data?.unitOfMeasure}
            </Text>
          </View>
        </View>
      )}

      {!isWeight && (
        <View style={{ gap: 6 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <HealthBar
              isLastLoggedToday={isLastLoggedToday}
              progress={barOneProgress}
              barType={"left"}
            />
            <HealthBar
              isLastLoggedToday={isLastLoggedToday}
              progress={barTwoProgress}
              barType={"middle"}
            />
            <HealthBar
              isLastLoggedToday={isLastLoggedToday}
              progress={barThreeProgress}
              barType={"right"}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 11,
                fontFamily: "Mulish_700Bold",
                color: themedColours.secondaryText[theme],
              }}
            >
              {leftLable}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontFamily: "Mulish_700Bold",
                color: themedColours.secondaryText[theme],
              }}
            >
              {rightLable}
            </Text>
          </View>
        </View>
      )}
      {isError && (
        <Text
          style={{ fontSize: 12, fontFamily: "Mulish_700Bold", color: "red" }}
        >
          Error getting data
        </Text>
      )}
      <Pressable
        onPress={() => onLog(metricType)}
        style={{
          borderWidth: 1,
          borderColor: isLastLoggedToday ? themedColours.stroke[theme] : "transparent",
          backgroundColor: isLastLoggedToday
            ? "transparent"
            : themedColours.primary[theme],
          height: 44,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Mulish_700Bold",
            color: isLastLoggedToday ? themedColours.primaryText[theme] : "white",
          }}
        >
          {isLastLoggedToday ? "Update" : "Log"}
        </Text>
      </Pressable>
    </Pressable>
  );
};

export const StockChart = ({
  points,
  chartBounds,
  lineColour,
  colourOne,
  colourTwo,
}) => {
  const { path: areaPath } = useAreaPath(points, chartBounds.bottom, {
    curveType: "natural",
  });
  const { path: linePath } = useLinePath(points, {
    curveType: "natural",
  });

  return (
    <>
      <Group>
        <Path path={areaPath} style="fill">
          <LinearGradient
            start={vec(0, 0)}
            end={vec(chartBounds.top, chartBounds.bottom)}
            colors={[colourOne, colourTwo]}
          />
        </Path>
        <Path
          path={linePath}
          style="stroke"
          strokeWidth={4}
          color={lineColour || themedColours.primary[theme]}
        />
      </Group>
    </>
  );
};

export default HealthCard;
