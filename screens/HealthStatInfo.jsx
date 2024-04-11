import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/settings/Header";
import COLOURS from "../constants/colours";
import { Bar, CartesianChart, Line, useChartPressState } from "victory-native";
import { StockChart } from "../components/me/HealthCard";
import { Circle, useFont } from "@shopify/react-native-skia";
import { Mulish_700Bold } from "@expo-google-fonts/mulish";
import ArrowDown from "../svgs/ArrowDown";
import ArrowDownShort from "../svgs/ArrowDownShort";
import ScientificDescription from "../components/me/ScientificDescription";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Sources from "../components/me/Sources";
import HealthSlider from "../components/me/HealthSlider";
import WeightInput from "../components/me/WeightInput";

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 - i,
  highTmp: 40 + 30 - i,
}));

const DATAOne = [
  { date: "2024-03-26", weight: 58 },
  { date: "2024-03-27", weight: 59 },
  { date: "2024-03-28", weight: 60 },
  { date: "2024-03-29", weight: 58 },
  { date: "2024-03-30", weight: 56 },
  { date: "2024-04-01", weight: 55 },
  { date: "2024-04-02", weight: 53 },
  // { date: "2024-04-04", weight: 50 },
  // { date: "2024-04-05", weight: 51 },
  // { date: "2024-04-07", weight: 53 },
  // { date: "2024-04-08", weight: 52 },
  // { date: "2024-04-09", weight: 50 },
  // { date: "2024-04-10", weight: 49 },
];

function ToolTip({ x, y }) {
  return <Circle cx={x} cy={y} r={8} color="white" />;
}

let totalWeight = 0;
const adjustedData = DATAOne.map((entry, index) => {
  totalWeight += entry.weight;
  const averageWeightUpToNow = totalWeight / (index + 1);
  return { ...entry, averageWeight: averageWeightUpToNow };
});

const HealthStatInfo = ({ route, navigation, isSlider }) => {
  const insets = useSafeAreaInsets();
  const font = useFont(Mulish_700Bold, 11);
  const [value, setValue] = useState(0);

  const { state, isActive } = useChartPressState({
    x: 0,
    y: { averageWeight: 0 },
  });

  const getDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay(); // This returns a number from 0 (Sunday) to 6 (Saturday)
    const abbreviations = ["S", "M", "T", "W", "T", "F", "S"];
    return abbreviations[dayOfWeek];
  };

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: "white" }}>
      <Header
        onNavigate={() => navigation.goBack()}
        headerText={route.params.statFor || "Weight"}
      />
      <KeyboardAwareScrollView
        // automaticallyAdjustKeyboardInsets
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
            {route.params.statFor || "Weight"}
          </Text>
          <View
            style={{
              backgroundColor: COLOURS.darkGreen,
              height: 490,
              // flex: 1,
              borderRadius: 20,
              paddingVertical: 10,
              // alignItems: 'center',
              // justifyContent: 'center'
            }}
          >
            <View
              style={{
                position: "absolute",
                flexDirection: "row",
                borderWidth: 1,
                borderColor: COLOURS.lightGray,
                borderRadius: 20,
                gap: 14,
                top: 14,
                right: 14,
                paddingHorizontal: 14,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Mulish_700Bold",
                  color: "#F7F6EF",
                }}
              >
                Week
              </Text>
              <ArrowDownShort color={"#F7F6EF"} width={9} height={4} />
            </View>
            <CartesianChart
              data={adjustedData} // 👈 specify your data
              xKey="date" // 👈 specify data key for x-axis
              yKeys={["weight", "averageWeight"]} // 👈 specify data keys used for y-axis
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
                    points={points.averageWeight}
                    lineColour={"white"}
                    colourOne={"rgba(255, 255, 255, 0.15)"}
                    colourTwo={"rgba(255, 255, 255, 0.01)"}
                    chartBounds={chartBounds}
                    //Connect missing data
                  />
                  {/* <Line
                    points={points.averageWeight}
                    color="white"
                    connectMissingData={true}
                    strokeWidth={3}
                    curveType="natural"
                    animate={{ type: "timing", duration: 300 }}
                  /> */}
                  <Bar
                    points={points.weight}
                    innerPadding={0.7}
                    chartBounds={chartBounds}
                    color="rgba(255, 255, 255, 0.08)"
                    roundedCorners={{ topLeft: 10, topRight: 10 }}
                  />
                  {isActive ? (
                    <ToolTip
                      x={state.x.position}
                      y={state.y.averageWeight.position}
                    />
                  ) : null}
                </>
              )}
            </CartesianChart>
          </View>
          <View style={{ gap: 14 }}>
            <Text style={{ fontSize: 17, fontFamily: "Mulish_600SemiBold" }}>
              What’s your weight today?
            </Text>

            {false && <WeightInput />}
            {true && (
              <View style={{marginTop: 65}}>
                <HealthSlider value={value} setValue={setValue} />
              </View>
            )}

            <Pressable
              style={{
                borderWidth: 1,
                borderColor: COLOURS.lightGray,
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
                  color: COLOURS.nearBlack,
                }}
              >
                Update
              </Text>
            </Pressable>
          </View>
          <ScientificDescription
            title="Weight and processed food"
            description={`Processed foods are engineered to be addictive, often causing you to eat more than intended. \n
These foods quickly elevate blood sugar, leading to inevitable crashes that trigger further hunger pangs, propelling a cycle of overeating.\n 
Additionally, they're rich in omega-6 fatty acids from seed and vegetable oils, which are known to cause inflammation. This inflammation not only harms your overall health but also disrupts your metabolism and the way your body stores fat, making weight management increasingly challenging.\n
The combination of these factors contributes significantly to the rising rates of obesity and related health issues.`}
          />
          <Sources />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default HealthStatInfo;
