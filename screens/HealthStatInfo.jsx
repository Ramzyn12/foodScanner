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

const screenWidth = Dimensions.get("screen").width;

// function ToolTip({ x, y, value }) {
//   const fontFamily = Platform.select({ ios: "Helvetica", default: "serif" });
//   const fontStyle = {
//     fontFamily,
//     fontSize: 14,
//     fontStyle: "italic",
//     fontWeight: "bold",
//   };
//   const font = matchFont(fontStyle);

//   if (!font) {
//     console.log("no font!");
//   }

//   const activeValueDisplay = useDerivedValue(() => value.value.toFixed(0));

//   const activeY = useDerivedValue(() => y.value - 20);

//   const activeX = useDerivedValue(() => x?.value - 0);

//   return (
//     <Group>
//       <Circle cx={x} cy={y} r={8} color="white" />
//       <SkiaText
//         x={activeX}
//         y={activeY}
//         text={activeValueDisplay} // Ensure value is a string
//         font={font}
//         color="white"
//       />
//     </Group>
//   );
// }

const calcRunningData = (data) => {
  let totalValue = 0;
  let validCount = 0; // Initialize a counter for valid entries

  return data.map((entry) => {
    let averageValueUpToNow;

    if (entry.metricValue !== null && entry.metricValue > 0) {
      totalValue += entry.metricValue;
      validCount++; // Only increment validCount for non-null, non-zero values
    }

    if (validCount > 0) {
      averageValueUpToNow = totalValue / validCount;
    } else {
      averageValueUpToNow = null;
    }

    return { ...entry, runningAverage: averageValueUpToNow };
  });
};

const HealthStatInfo = ({ route, navigation, isSlider }) => {
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const scrollViewRef = useRef(null);
  const isWeight = route.params.metricType === "Weight";
  const [value, setValue] = useState(0);
  const [weightValue, setWeightValue] = useState("");
  const [adjustedData, setAdjustedData] = useState([]);
  const [showAverageLine, setShowAverageLine] = useState(false);
  const [graphWeightUnit, setGraphWeightUnit] = useState("kg");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("Week");
  const [isLastLoggedToday, setIsLastLoggedToday] = useState(false);
  const [weightUnit, setWeightUnit] = useState("imperial");

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

  const { data, isLoading } = useQuery({
    queryFn: () =>
      getAllDataForMetric({
        metric: route.params.metricType,
        timeFrame: selectedTimeFrame,
      }),
    queryKey: ["MetricGraphData", route.params.metricType, selectedTimeFrame],
  });

  const updateHealthMetricMutation = useMutation({
    mutationFn: updateHealthMetric,
    onSuccess: () => {
      queryClient.invalidateQueries(["RecentMetric"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // useCallback?
  const getValidCount = (data) => {
    return data.reduce((a, c) => {
      if (c.metricValue !== null) {
        return (a += 1);
      } else {
        return a;
      }
    }, 0);
  };

  useEffect(() => {
    if (data) {
      const lastLoggedToday = data[data.length - 1].metricValue !== null;
      setIsLastLoggedToday(lastLoggedToday);
      const validDataPoints = getValidCount(data);
      const validPointsPerLimit = (validDataPoints / daysOfTimeFrame) * 100;
      if (validPointsPerLimit > 30) {
        setShowAverageLine(true);
      } else {
        setShowAverageLine(false);
      }
      let newAdjustedData = calcRunningData(data);
      if (isWeight) {
        newAdjustedData = normalizeDataToUnit(newAdjustedData, graphWeightUnit);
      }
      setAdjustedData(newAdjustedData);
    }
  }, [data]);

  const convertWeightValue = (value, fromUnit, toUnit) => {
    if (!value) return null; // Handle null, undefined, and zero to prevent NaN results
    if (fromUnit === toUnit) return value;
    return fromUnit === "kg" && toUnit === "lbs"
      ? value * 2.20462
      : value * 0.453592;
  };

  const normalizeDataToUnit = (data, unit) => {
    return data.map((entry) => ({
      ...entry,
      metricValue:
        entry.unitOfMeasure !== unit
          ? convertWeightValue(entry.metricValue, entry.unitOfMeasure, unit)
          : entry.metricValue,
      unitOfMeasure: unit, // Normalize all data to the same unit
    }));
  };

  const handleGraphUnitChange = (targetUnit) => {
    if (targetUnit !== graphWeightUnit) {
      // Map through data, converting only entries that need conversion
      const convertedData = normalizeDataToUnit(adjustedData, targetUnit);
      // Update the data and the unit state
      setAdjustedData(convertedData);
      setGraphWeightUnit(targetUnit);
    }
  };

  const handleTimeFrameChange = (timeFrame) => {
    setSelectedTimeFrame(timeFrame);
  };

  const handleUpdateMetric = () => {
    Keyboard.dismiss(); // Dismiss the keyboard upon submission
    updateHealthMetricMutation.mutate({
      metric: route.params.metricType,
      date: new Date(),
      metricValue: isWeight ? weightValue : value,
      unitOfMeasure: weightUnit === "imperial" ? "kg" : "lbs",
    });
    setWeightValue("");
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToPosition(0, 0); //animated: true for smooth scrolling
    }
  };

  if (isLoading || adjustedData.length === 0) return <Text>Loading...</Text>;

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: "white" }}>
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
              color: COLOURS.nearBlack,
            }}
          >
            {route.params.metricType}
          </Text>
          {isWeight && (
            <View style={{ flexDirection: "row", gap: 30 }}>
              <Pressable
                onPress={() => handleGraphUnitChange("kg")}
                style={{ padding: 10, borderWidth: 1, borderColor: "bluex" }}
              >
                <Text>kg</Text>
              </Pressable>
              <Pressable
                onPress={() => handleGraphUnitChange("lbs")}
                style={{ padding: 10, borderWidth: 1, borderColor: "bluex" }}
              >
                <Text>lbs</Text>
              </Pressable>
            </View>
          )}
          <View
            style={{
              backgroundColor: COLOURS.darkGreen,
              height: 480,
              // flex: 1,
              borderRadius: 20,
              paddingVertical: 10,
              // alignItems: 'center',
              // justifyContent: 'center'
            }}
          >
            <ChangeDateDropdown
              selectedTimeFrame={selectedTimeFrame}
              onTimeFrameChange={handleTimeFrameChange}
            />
            <VictoryChart
              domainPadding={{ x: [20, 10], y: 20 }}
              height={450}
              width={screenWidth - 40}
              // containerComponent={
              //   <VictoryVoronoiContainer
              //     labels={({ datum }) => `${datum.runningAverage.toFixed(1)}`}
              //     voronoiBlacklist={["bar1"]}
              //     labelComponent={
              //       <VictoryTooltip
              //         constrainToVisibleArea
              //         pointerLength={0}
              //         // flyoutComponent={<View style={{width: 10, height: 10, backgroundColor: 'red'}}></View>}
              //         // labelComponent={<Text>Hey</Text>}
              //         flyoutStyle={{
              //           stroke: "tomato",
              //           strokeWidth: 2,
              //           fill: "white",
              //         }}
              //         dy={-20} // Adjust vertical position
              //       />
              //     }
              //   />
              // }
            >
              <VictoryAxis
                style={{
                  axis: { stroke: "transparent" }, // Hides the axis line
                  tickLabels: {
                    fill: "rgba(255, 255, 255, 0.40)",
                    fontSize: 11,
                    fontFamily: "Mulish_700Bold",
                  },
                }}
                tickFormat={(t) => {
                  if (isWeight) return `${t} ${graphWeightUnit}`;
                  if (!isWeight) return t;
                }}
                dependentAxis
              />
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
                style={{ data: { fill: "#FFFFFF14" } }}
                cornerRadius={{
                  topLeft: ({ barWidth }) => {
                    return barWidth / 2;
                  },
                  topRight: ({ barWidth }) => {
                    return barWidth / 2;
                  },
                }}
              />
              {showAverageLine && (
                <VictoryLine
                  data={adjustedData}
                  x="date"
                  name="line1"
                  interpolation="basis"
                  style={{
                    data: {
                      stroke: "#FFFFFF",
                      strokeWidth: 4,
                      strokeLinecap: "round",
                      borderRadius: 20,
                    },
                  }}
                  y="runningAverage"
                />
              )}
            </VictoryChart>
            {/* <CartesianChart
              data={adjustedData} // 👈 specify your data
              xKey="date" // 👈 specify data key for x-axis
              yKeys={["metricValue", "runningAverage"]} // 👈 specify data keys used for y-axis
              domainPadding={20}
              padding={20}
              chartPressState={state} // 👈 and pass it to our chart.
              axisOptions={{
                font,
                lineColor: "transparent",
                lineWidth: { grid: 0, frame: 0 },
                labelColor: "rgba(255, 255, 255, 0.60)",
                // tickCount: { x: 7, y: 5  },
                labelOffset: { x: 10, y: 0 },
                formatXLabel: (label) => getDayOfWeek(label),
              }}
            >
              {({ points, chartBounds }) => (
                <>
                  <StockChart
                    points={points.runningAverage}
                    lineColour={"white"}
                    colourOne={"rgba(255, 255, 255, 0.15)"}
                    colourTwo={"rgba(255, 255, 255, 0.01)"}
                    chartBounds={chartBounds}
                    //Connect missing data
                  /> */}
            {/* <Line
                    points={points.averageWeight}
                    color="white"
                    connectMissingData={true}
                    strokeWidth={3}
                    curveType="natural"
                    animate={{ type: "timing", duration: 300 }}
                  /> */}
            {/* <Bar
                    points={points.metricValue}
                    innerPadding={0.7}
                    chartBounds={chartBounds}
                    color="rgba(255, 255, 255, 0.08)"
                    roundedCorners={{ topLeft: 10, topRight: 10 }}
                  />
                  {isActive ? (
                    <ToolTip
                      x={state.x.position}
                      y={state.y.runningAverage.position}
                      value={state.y?.runningAverage?.value}
                      font={font}
                      top={chartBounds.top}
                    />
                  ) : null}
                </>
              )}
            </CartesianChart> */}
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
                  color: isLastLoggedToday ? COLOURS.nearBlack : "white",
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
