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
} from "@shopify/react-native-skia";
import {
  Mulish_300Light,
  Mulish_500Medium,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import ArrowDown from "../svgs/ArrowDown";
import ArrowDownShort from "../svgs/ArrowDownShort";
import ScientificDescription from "../components/me/ScientificDescription";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Sources from "../components/me/Sources";
import HealthSlider from "../components/me/HealthSlider";
import WeightInput from "../components/me/WeightInput";
import { useDerivedValue } from "react-native-reanimated";
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

const screenWidth = Dimensions.get("screen").width;

const CustomTooltip = ({ x, y, datum, visible }) => {
  if (!visible || datum.metricValue === null) {
    return null;
  }

  const metricValue =
    datum.metric === "Weight"
      ? datum.metricValue + datum.unitOfMeasure
      : datum.metricValue;

  const textLength = String(metricValue).length;
  const leftAdjustment = textLength * 5; // Adjust this value based on your needs

  return (
    <View
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.20)",
        padding: 10,
        borderRadius: 5,
        position: "absolute",
        left: x - 15 - textLength * 1.5,
        top: y && y - 60,
        gap: 8,
        alignItems: "center",
        // top: 75
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: Math.max(24 - textLength * 1.2, 15),
          fontFamily: "Mulish_700Bold",
        }}
      >
        {metricValue}
      </Text>
    </View>
  );
};

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
  const isImperial = weightUnit === "imperial";
  const isMetric = weightUnit === "metric";
  const [selectedX, setSelectedX] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const releaseTimeoutRef = useRef(null);
  const { theme } = useColourTheme();

  const handleBarPress = (datum) => {
    setSelectedX(datum.date);
    setTooltipVisible(true); // Show tooltip
    setIsDisabled(true);
  };

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

  useEffect(() => {
    if (data) {
      const lastLoggedToday = data[data.length - 1].metricValue !== null;
      setIsLastLoggedToday(lastLoggedToday);
      let newAdjustedData = data;
      if (isWeight) {
        newAdjustedData = normalizeDataToUnit(newAdjustedData, weightUnit);
      }
      setAdjustedData(newAdjustedData);
    }
  }, [data]);

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
      setWeightUnit(targetUnit);
    }
  };

  const handleTimeFrameChange = (timeFrame) => {
    setSelectedTimeFrame(timeFrame);
  };

  const handleUpdateMetric = () => {
    Keyboard.dismiss(); // Dismiss the keyboard upon submission
    updateHealthMetricMutation.mutate({
      metric: route.params.metricType,
      date: getCurrentDateLocal(),
      metricValue: isWeight ? weightValue : value,
      unitOfMeasure: weightUnit === "imperial" ? "kg" : "lbs",
    });
    setWeightValue("");
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToPosition(0, 0); //animated: true for smooth scrolling
    }
  };

  // Change Loading state? Maybe test this with loadss of data
  // if (isLoading || adjustedData.length === 0) return <Text>Loading...</Text>;

  const handleBarRelease = () => {
    setSelectedX(null);
    setTooltipVisible(false); // Hide tooltip
    setIsDisabled(false);
  };

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: themedColours.primaryBackground[theme]}}>
      <Header
        onNavigate={() => navigation.goBack()}
        headerText={route.params.metricType || "Weight"}
      />
      <KeyboardAwareScrollView
        // automaticallyAdjustKeyboardInsets
        ref={scrollViewRef}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords={false}
        style={{ flex: 1, padding: 20 }}
      >
        <View
          style={{
            flex: 1,
            gap: 20,
            paddingBottom: 150,
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
          {isWeight && (
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Pressable
                onPress={() => handleGraphUnitChange("imperial")}
                style={{
                  height: 36,
                  paddingHorizontal: 14,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  backgroundColor: isImperial ? themedColours.primary[theme] : themedColours.primaryBackground[theme],
                  borderWidth: 1,
                  borderColor: isImperial ? "transparent" : themedColours.stroke[theme],
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Mulish_700Bold",
                    color: isImperial ? themedColours.primaryBackground[theme] : themedColours.primaryText[theme],
                  }}
                >
                  Imperial
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleGraphUnitChange("metric")}
                style={{
                  height: 36,
                  paddingHorizontal: 14,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  backgroundColor: isMetric ? themedColours.primary[theme] : themedColours.primaryBackground[theme],
                  borderWidth: 1,
                  borderColor: isMetric ? "transparent" : themedColours.stroke[theme],
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Mulish_700Bold",
                    color: isMetric ? themedColours.primaryBackground[theme] : themedColours.primaryText[theme],
                  }}
                >
                  Metric
                </Text>
              </Pressable>
            </View>
          )}
          <View
            style={{
              backgroundColor: themedColours.primary[theme],
              height: 480,
              // flex: 1,
              borderRadius: 20,
              paddingVertical: 10,
              // alignItems: 'center',
              // justifyContent: 'center'
            }}
          >
            {/* {emptyData && <Text style={{position: 'absolute', left: '50%', top: '50%', zIndex: 3000, color: 'yellow', fontSize: 20}}>HELLLLLOOO</Text>} */}
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
            <ChangeDateDropdown
              selectedTimeFrame={selectedTimeFrame}
              onTimeFrameChange={handleTimeFrameChange}
            />
            <VictoryChart
              domainPadding={{ x: [20, 35], y: 80 }}
              height={450}
              width={screenWidth - 20}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `${datum.metricValue}`}
                  labelComponent={<CustomTooltip visible={tooltipVisible} />} // Always render with visibility control
                  voronoiPadding={40}
                  // activateLabels={tooltipVisible}
                  voronoiDimension="x"
                  // disable={isDisabled}
                  onActivated={(points) => {
                    if (
                      points &&
                      points.length > 0 &&
                      points[0].metricValue !== null
                    ) {
                      handleBarPress(points[0]);
                    }
                  }}
                />
              }
              events={[
                {
                  target: "parent",
                  eventHandlers: {
                    onTouchEnd: () => {
                      handleBarRelease();
                      return null;
                    },
                  },
                },
              ]}
            >
              {!emptyData && !isErrorGraphData && (
                <VictoryAxis
                  style={{
                    axis: { stroke: "transparent" }, // Hides the axis line
                    tickLabels: {
                      fill: "rgba(255, 255, 255, 0.40)",
                      fontSize: 11,
                      fontFamily: "Mulish_700Bold",
                    },
                  }}
                  tickFormat={(t) => t}
                  tickValues={isWeight ? undefined : [0, 2, 4, 6, 8, 10]}
                  dependentAxis
                />
              )}
              {/* can do better than this with absoulte */}
              {emptyData && (
                <VictoryLabel
                  text="No Data"
                  x={screenWidth / 2 - 20} // Adjust x and y to center the label
                  y={225}
                  textAnchor="middle"
                  style={{
                    fill: "#ffffff", // Assuming a dark chart background
                    fontSize: 20,
                    fontFamily: "Mulish_700Bold",
                  }}
                />
              )}
              <VictoryAxis
                tickCount={7}
                style={{
                  axis: { stroke: "transparent" }, // Hides the axis line
                  tickLabels: {
                    fill: "transparent",
                  }, // Style for the tick labels
                }}
                tickLabelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    verticalAnchor="start"
                    lineHeight={1.4} // Adjust the line height to control spacing
                    style={[
                      {
                        fill: "rgba(255, 255, 255, 0.80)",
                        fontSize: 11,
                        fontFamily: "Mulish_700Bold",
                      },
                      {
                        fill: "rgba(255, 255, 255, 0.60)",
                        fontSize: 10,
                        fontFamily: "Mulish_500Medium",
                      },
                    ]}
                  />
                } // Use the custom label component
                tickFormat={(date) => {
                  if (isErrorGraphData) return "";
                  const d = new Date(date);
                  return `${d.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}\n${d.getDate()}`;
                }}
              />
              <VictoryBar
                data={adjustedData}
                x="date"
                name="bar1"
                y="metricValue"
                // y={(datum) => {
                //   return datum.metricValue || 0;
                // }}
                style={{
                  data: {
                    fill: ({ datum }) =>
                      datum.date === selectedX ? "#FFFFFF" : "#FFFFFF14",
                  },
                }}
                cornerRadius={{
                  top: ({ barWidth, datum }) => {
                    // if (datum.metricValue !== 0) {
                    //   return barWidth / 2;
                    // }
                    // return 5;
                    return Math.floor(barWidth / 2);
                  },
                }}
              />
              {/* {selectedX && (
                <VictoryLine
                  style={{
                    data: {
                      stroke: "#FFFFFF80",
                      strokeWidth: 2,
                      strokeDasharray: "5,5",
                    },
                  }}
                  data={[
                    { x: selectedX, y: 0 },
                    {
                      x: selectedX,
                      y: Math.max(...adjustedData.map((d) => d.metricValue)),
                    },
                  ]}
                />
              )} */}
            </VictoryChart>
          </View>
          <View style={{ gap: 14 }}>
            <Text style={{ fontSize: 17, fontFamily: "Mulish_600SemiBold" }}>
              {question}
            </Text>

            {route.params.metricType === "Weight" && (
              <WeightInput
                weightUnit={weightUnit}
                setWeightUnit={setWeightUnit}
                value={weightValue}
                setValue={setWeightValue}
              />
            )}
            {route.params.metricType !== "Weight" && (
              <View style={{ marginTop: 65 }}>
                <HealthSlider
                  metricType={route.params.metricType}
                  value={value}
                  setValue={setValue}
                />
              </View>
            )}
            <Pressable
              onPress={handleUpdateMetric}
              style={{
                borderWidth: 1,
                borderColor: isLastLoggedToday
                  ? COLOURS.lightGray
                  : "transparent",
                backgroundColor: isLastLoggedToday
                  ? "transparent"
                  : COLOURS.darkGreen,
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
          </View>
          <ScientificDescription
            metricType={route.params.metricType}
            title="Weight and processed food"
            description={`Processed foods are engineered to be addictive, often causing you to eat more than intended. \n
These foods quickly elevate blood sugar, leading to inevitable crashes that trigger further hunger pangs, propelling a cycle of overeating.\n 
Additionally, they're rich in omega-6 fatty acids from seed and vegetable oils, which are known to cause inflammation. This inflammation not only harms your overall health but also disrupts your metabolism and the way your body stores fat, making weight management increasingly challenging.\n
The combination of these factors contributes significantly to the rising rates of obesity and related health issues.`}
          />
          <Sources metricType={route.params.metricType} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default HealthStatInfo;
