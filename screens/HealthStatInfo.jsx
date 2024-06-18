import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/settings/Header";
import COLOURS from "../constants/colours";
import {
  Bar,
  CartesianChart,
  Line,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryZoomContainer,
  useChartPressState,
} from "victory-native";
import { StockChart } from "../components/me/HealthCard";
import {
  Circle,
  Group,
  useFont,
  Text as SkiaText,
  matchFont,
  useDerivedValueOnJS,
} from "@shopify/react-native-skia";
import ArrowDown from "../svgs/ArrowDown";
import ArrowDownShort from "../svgs/ArrowDownShort";
import ScientificDescription from "../components/me/ScientificDescription";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Sources from "../components/me/Sources";
import HealthSlider from "../components/me/HealthSlider";
import WeightInput from "../components/me/WeightInput";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllDataForMetric,
  updateHealthMetric,
} from "../axiosAPI/healthMetricAPI";
import ContextMenu from "react-native-context-menu-view";
import ChangeDateDropdown from "../components/me/ChangeDateDropdown";
import { getCurrentDateLocal } from "../utils/dateHelpers";
import Toast from "react-native-toast-message";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";
import { useNavigation } from "@react-navigation/native";
import { useCustomerInfo } from "../hooks/useCustomerInfo";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { format, isToday } from "date-fns";

const screenWidth = Dimensions.get("screen").width;

const convertWeightValue = (value, fromUnit, toUnit) => {
  if (value === 0) return 0;
  if (!value) return null; // Handle null, undefined, and zero to prevent NaN results
  if (fromUnit === toUnit) return value;
  const convertedValue =
    fromUnit === "kg" && toUnit === "lbs" ? value * 2.20462 : value * 0.453592;
  return Math.round(convertedValue * 100) / 100; // Round to two decimal places
};

const HealthStatInfo = ({ route, navigation, isSlider }) => {
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const scrollViewRef = useRef(null);
  const isWeight = route.params.metricType === "Weight";
  const [value, setValue] = useState(0);
  const [weightValue, setWeightValue] = useState("");
  const [adjustedData, setAdjustedData] = useState([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("Week");
  const [isLastLoggedToday, setIsLastLoggedToday] = useState(false);
  const [weightUnit, setWeightUnit] = useState("imperial");
  const [displayMetric, setDisplayMetric] = useState("");
  const [displayDate, setDisplayDate] = useState("");
  const isImperial = weightUnit === "imperial";
  const isMetric = weightUnit === "metric";
  const [selectedX, setSelectedX] = useState(null);
  const [maxWeight, setMaxWeight] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const [mostRecentValidData, setMostRecentValidData] = useState(null);
  const { theme } = useColourTheme();
  const longPressTimer = useRef(null);

  const [isSubscribed, setIsSubscribed] = useState(undefined);

  const { customerInfo, error, loading } = useCustomerInfo();

  useEffect(() => {
    if (!customerInfo) return;

    if (typeof customerInfo.entitlements.active["Pro"] !== "undefined") {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [customerInfo]);

  const daysOfTimeFrame =
    selectedTimeFrame === "Week" ? 7 : selectedTimeFrame === "Month" ? 28 : 364;

  const question =
    route.params.metricType === "Weight"
      ? `What's your weight today?`
      : route.params.metricType === "Energy"
      ? "How are your energy levels today?"
      : route.params.metricType === "Anxiety"
      ? "How is your anxiety today?"
      : "How well did you sleep last night?";

  const {
    data,
    isLoading,
    isError: isErrorGraphData,
    error: errorGraphData,
  } = useQuery({
    // Should be called get graph data
    queryFn: () =>
      getAllDataForMetric({
        metric: route.params.metricType,
        timeFrame: selectedTimeFrame,
      }),
    retry: 1,
    queryKey: ["MetricGraphData", route.params.metricType, selectedTimeFrame],
  });

  const emptyData = data?.every((item) => item.metricValue === null);

  const updateHealthMetricMutation = useMutation({
    mutationFn: updateHealthMetric,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["RecentMetric", variables.metric],
      });
      queryClient.invalidateQueries({ queryKey: ["TimelineWeek"] });
      queryClient.invalidateQueries({
        queryKey: [
          "MetricGraphData",
          route.params.metricType,
          selectedTimeFrame,
        ],
      });
    },
    onError: (err) => {
      Toast.show({
        type: "customErrorToast",
        text1: "Failed to update metric, please try again later",
      });
    },
  });

  const dataToYearlyAverage = (data) => {
    // Create an object to store the sum and count of each month's data
    const monthlyData = {};

    data.forEach((entry) => {
      const date = new Date(entry.date);
      const month = date.getUTCMonth(); // get month as UTC
      const year = date.getUTCFullYear(); // get year as UTC
      const key = `${year}-${month}`;

      if (!monthlyData[key]) {
        monthlyData[key] = {
          sum: 0,
          count: 0,
          firstDate: new Date(Date.UTC(year, month)),
        };
      }

      if (entry.metricValue !== null) {
        monthlyData[key].sum += entry.metricValue;
        monthlyData[key].count += 1;
      }
    });

    // Convert the monthlyData object to an array of average values
    const monthlyAverages = Object.keys(monthlyData).map((key) => {
      const { sum, count, firstDate } = monthlyData[key];
      const average = count > 0 ? sum / count : null;

    
      return {
        date: firstDate,
        metricValue: average ?  parseFloat(average.toFixed(1)) : average,
        metric: route.params.metricType,
        // updatedAt: "2024-06-17T08:47:52.099Z",
        // userId: "664c6883d98714a675539a64",
        // __v: 0,
        // _id: "666ff83870b96c6dafa5024f",
        // createdAt: "2024-06-17T08:47:52.099Z",
      };
    });

    if (monthlyAverages.length > 12) {
      monthlyAverages.shift();
    }

    return monthlyAverages;
  };

  useEffect(() => {
    if (data) {
      const lastLoggedToday = data[data.length - 1].metricValue !== null;
      setIsLastLoggedToday(lastLoggedToday);
      let newAdjustedData = data;
      if (isWeight) {
        newAdjustedData = normalizeDataToUnit(newAdjustedData, weightUnit);
      }

      if (selectedTimeFrame === "Year") {
        newAdjustedData = dataToYearlyAverage(newAdjustedData);
      }

      const recentData = newAdjustedData.findLast(
        (d) => d.metricValue !== null
      );
      setMostRecentValidData(recentData);

      if (!recentData) {
        setDisplayMetric("No data");
        setDisplayDate(
          `Add your ${route.params.metricType.toLowerCase()} to see data`
        );
      } else {
        setDisplayMetric(
          `${recentData.metricValue}${
            isWeight ? recentData.unitOfMeasure : "/10"
          }`
        );
        setDisplayDate(formatDate(recentData.date));
      }
      setMaxWeight(
        Math.max(...newAdjustedData.map((val) => val.metricValue || 0))
      );
      console.log(newAdjustedData);
      setAdjustedData(newAdjustedData);
    }
  }, [data, weightUnit]);

  const formatDate = (dateString) => {
    if (!dateString) return ""; // safeguard against undefined input
    const date = new Date(dateString);
    if (isToday(date)) {
      return "Today";
    }
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC", // Adjust timeZone if necessary
    });
  };
  // console.log(displayDate, displayMetric);

  const updateDisplay = (datum) => {
    if (datum.metricValue === "null") return;
    if (isWeight) {
      setDisplayMetric(`${datum.metricValue}${datum.unitOfMeasure}`);
    } else {
      setDisplayMetric(`${datum.metricValue}/10`);
    }
    setDisplayDate(formatDate(datum.date));
  };

  const normalizeDataToUnit = (data, unit) => {
    let measure = unit === "imperial" ? "kg" : "lbs";
    return data.map((entry) => ({
      ...entry,
      metricValue:
        entry.unitOfMeasure !== measure
          ? convertWeightValue(entry.metricValue, entry.unitOfMeasure, measure)
          : entry.metricValue,
      unitOfMeasure: measure, // Normalize all data to the same unit
    }));
  };

  const handleGraphUnitChange = (targetUnit) => {
    if (targetUnit !== weightUnit) {
      // Map through data, converting only entries that need conversion
      const convertedData = normalizeDataToUnit(adjustedData, targetUnit);
      // Update the data and the unit state
      setAdjustedData(convertedData);
      // setDisplayMetric((prev) => `${prev.metricValue}${datum.unitOfMeasure}`);
      let targetMeasure = targetUnit === "imperial" ? "kg" : "lbs";
      // let currentMeasure = weightUnit === "imperial" ? "kg" : "lbs";
      // setMaxWeight((val) => convertWeightValue(val, currentMeasure, targetMeasure))
      setMaxWeight(
        Math.max(...convertedData.map((val) => val.metricValue || 0))
      );
      setWeightUnit(targetUnit);
    }
  };

  const handleTimeFrameChange = (timeFrame) => {
    console.log(timeFrame);
    if (timeFrame !== "Week" && !isSubscribed) {
      navigation.navigate("Paywall");
      return;
    }
    setSelectedTimeFrame(timeFrame);
  };

  // Change Loading state? Maybe test this with loadss of data
  // if (isLoading || adjustedData.length === 0) return <Text>Loading...</Text>;

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        backgroundColor: themedColours.primaryBackground[theme],
      }}
    >
      <Header
        onNavigate={() => navigation.goBack()}
        headerText={route.params.metricType || "Weight"}
        weightUnit={weightUnit}
        onUnitChange={handleGraphUnitChange}
      />
      <ScrollView
        scrollEnabled={isScrollEnabled}
        // scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, padding: 20 }}
      >
        <View
          style={{
            flex: 1,
            gap: 20,
            paddingBottom: 70,
          }}
        >
          <Text
            style={{
              fontSize: 34,
              fontFamily: "Mulish_700Bold",
              color: themedColours.primaryText[theme],
            }}
          >
            {route.params.metricType}
          </Text>
          <SegmentedControl
            values={["Week", "Month", "Year"]}
            selectedIndex={0}
            appearance={theme}
            fontStyle={{
              color: themedColours.primaryText[theme],
              fontSize: 13,
              fontFamily: "Mulish_600SemiBold",
            }}
            onChange={(e) => handleTimeFrameChange(e.nativeEvent.value)}
            // onValueChange={(val) => handleTimeFrameChange(val)}
          />
          <View>
            <Text
              style={{
                fontSize: 19,
                textAlign: "center",
                fontFamily: "Mulish_700Bold",
                marginBottom: 8,
                color: themedColours.primaryText[theme],
              }}
            >
              {displayMetric}
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                fontFamily: "Mulish_700Bold",
                marginBottom: 20,
                color: themedColours.secondaryText[theme],
              }}
            >
              {displayDate}
            </Text>

            {isErrorGraphData && (
              <Text
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  zIndex: 3000,
                  color: "yellow",
                  fontSize: 20,
                }}
              >
                Error
              </Text>
            )}
            {/* GRAPH */}
            <VictoryChart
              padding={{ left: 20, right: 20, bottom: 40 }}
              height={300}
              // domain={{y: [0, 10]}}
              width={screenWidth - 40}
              events={[
                {
                  target: "parent",
                  eventHandlers: {
                    onTouchEnd: (e) => {
                      setIsHolding(false);
                      if (longPressTimer.current) {
                        clearTimeout(longPressTimer.current);
                      }
                      setIsScrollEnabled(true);
                      if (mostRecentValidData) {
                        updateDisplay(mostRecentValidData);
                      }
                    },
                    onTouchStart: (e) => {
                      if (longPressTimer.current) {
                        clearTimeout(longPressTimer.current);
                      }
                      // Set a new timer
                      longPressTimer.current = setTimeout(() => {
                        setIsScrollEnabled(false);
                      }, 100);
                    },
                  },
                },
              ]}
              containerComponent={
                <VictoryVoronoiContainer
                  voronoiDimension="x"
                  voronoiBlacklist={["bar2"]}
                  onActivated={(points, props) => {
                    if (points && points.length > 0 && !isScrollEnabled) {
                      const datum = points[0];
                      // console.log(datum.metricValue, 'VALUE');
                      if (datum.metricValue !== null) {
                        updateDisplay(datum);
                        setSelectedX(datum.date);
                        setIsHolding(true);
                      }
                    }
                  }}
                />
              }
            >
              {/* {emptyData && (
                <VictoryLabel
                  text="No Data"
                  x={screenWidth / 2 - 20} // Adjust x and y to center the label
                  y={225}
                  textAnchor="middle"
                  style={{
                    fill: themedColours.primaryBackground[theme], // Assuming a dark chart background
                    fontSize: 20,
                    fontFamily: "Mulish_700Bold",
                  }}
                />
              )} */}
              <VictoryAxis
                tickCount={selectedTimeFrame === "Year" ? 12 : 7}
                style={{
                  axis: { stroke: "transparent" }, // Hides the axis line
                  tickLabels: {
                    fill: "transparent",
                  }, // Style for the tick labels
                }}
                tickValues={adjustedData.map((val) => val.date)}
                tickLabelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    verticalAnchor="start"
                    lineHeight={1.4} // Adjust the line height to control spacing
                    style={[
                      {
                        fill: themedColours.primaryText[theme],
                        opacity: 0.8,
                        fontSize: 11,
                        fontFamily: "Mulish_700Bold",
                      },
                      {
                        fill: themedColours.primaryText[theme],
                        opacity: 0.6,
                        fontSize: 10,
                        fontFamily: "Mulish_500Medium",
                      },
                    ]}
                  />
                } // Use the custom label component
                tickFormat={(date) => {
                  if (isErrorGraphData) return "";
                  const monthAbbr = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ]; // Array of month abbreviations
                  const d = new Date(date);
                  if (selectedTimeFrame === "Year") {
                    return monthAbbr[d.getMonth()]; // Get abbreviation based on month index
                  }
                  return `${d.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}\n${d.getDate()}`;
                }}
              />
              <VictoryBar
                alignment="left"
                name="bar2"
                data={adjustedData.map((d) => ({
                  ...d,
                  metricValue: isWeight ? maxWeight : 10, // Need to change this to max value
                }))}
                x="date"
                barRatio={0.45}
                y="metricValue"
                style={{
                  data: {
                    fill: themedColours.secondaryBackground[theme],
                    opacity: ({ datum }) =>
                      !isHolding ? 1 : datum.date === selectedX ? 1 : 0.2,
                  },
                }}
                padding={{ top: 0, left: 0, bottom: 0, right: 0 }}
                cornerRadius={{
                  top: ({ barWidth, datum }) => {
                    return Math.floor(barWidth / 1.2);
                  },
                  bottom: ({ barWidth, datum }) => {
                    return Math.floor(barWidth / 1.2);
                  },
                }}
              />
              <VictoryBar
                alignment="left"
                data={adjustedData}
                x="date"
                barRatio={0.45}
                name="bar1"
                padding={{ top: 0, left: 0, bottom: 0, right: 0 }}
                y="metricValue"
                style={{
                  data: {
                    opacity: ({ datum }) =>
                      !isHolding ? 1 : datum.date === selectedX ? 1 : 0.2,

                    fill: themedColours.primary[theme],
                  },
                }}
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onPressIn: (_, { datum }) => {
                        updateDisplay(datum);
                        setSelectedX(datum.date);
                        setIsHolding(true);
                      },
                    },
                  },
                ]}
                cornerRadius={{
                  top: ({ barWidth, datum }) => {
                    return Math.floor(barWidth / 1.2);
                  },
                  bottom: ({ barWidth, datum }) => {
                    return Math.floor(barWidth / 1.2);
                  },
                }}
              />
            </VictoryChart>
          </View>
          <ScientificDescription
            metricType={route.params.metricType}
            title="Weight and processed food"
            description={`Processed foods are engineered to be addictive, often causing you to eat more than intended. \n
These foods quickly elevate blood sugar, leading to inevitable crashes that trigger further hunger pangs, propelling a cycle of overeating.\n 
Additionally, they're rich in omega-6 fatty acids from seed and vegetable oils, which are known to cause inflammation. This inflammation not only harms your overall health but also disrupts your metabolism and the way your body stores fat, making weight management increasingly challenging.\n
The combination of these factors contributes significantly to the rising rates of obesity and related health issues.`}
          />
          {/* <Sources metricType={route.params.metricType} /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default HealthStatInfo;
