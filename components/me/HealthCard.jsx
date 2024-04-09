import { View, Text, Pressable } from "react-native";
import React from "react";
import ArrowRight from "../../svgs/ArrowRight";
import { CartesianChart, useAreaPath, useLinePath } from "victory-native";
import COLOURS from "../../constants/colours";
import { Group, LinearGradient, Path, vec } from "@shopify/react-native-skia";
import HealthBar from "./HealthBar";

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 - i,
  highTmp: 40 + 30 - i,
}));

const HealthCard = ({ isGraph }) => {
  let progress = 85;
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

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: COLOURS.lightGray,
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
              color: COLOURS.nearBlack,
              fontSize: 16,
            }}
          >
            Weight
          </Text>
          <ArrowRight />
        </View>
        <View style={{flexDirection: 'row', gap: 2}}>
          <Text
            style={{
              fontFamily: "Mulish_400Regular",
              color: "#636566",
              fontSize: 14,
            }}
          >
            Last Logged:
          </Text>
          <Text
            style={{
              fontFamily: "Mulish_700Bold",
              color: "#636566",
              fontSize: 14,
            }}
          >
            Today
          </Text>
        </View>
      </View>
      {isGraph && (
        <View style={{ flexDirection: "row", gap: 20 }}>
          <CartesianChart
            data={DATA} // 👈 specify your data
            xKey="day" // 👈 specify data key for x-axis
            yKeys={["lowTmp", "highTmp"]} // 👈 specify data keys used for y-axis
            // domainPadding={{ bottom: 10 }}
            // axisOptions={{ font, lineColor: "transparent" }} // 👈 we'll generate axis labels using given font.
          >
            {({ points, chartBounds }) => {
              return <StockChart points={points} chartBounds={chartBounds} />;
            }}
          </CartesianChart>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ fontSize: 50, fontFamily: "700Mulish_Bold" }}>
              68
            </Text>
            <Text style={{ fontSize: 11, fontFamily: "700Mulish_Bold" }}>
              KG
            </Text>
          </View>
        </View>
      )}
      {!isGraph && (
        <View style={{ gap: 6 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <HealthBar progress={barOneProgress} barType={"left"} />
            <HealthBar progress={barTwoProgress} barType={"middle"} />
            <HealthBar progress={barThreeProgress} barType={"right"} />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 11,
                fontFamily: "Mulish_700Bold",
                color: "#636566",
              }}
            >
              None
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontFamily: "Mulish_700Bold",
                color: "#636566",
              }}
            >
              Extreme
            </Text>
          </View>
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
        <Text style={{ fontSize: 14, fontFamily: "Mulish_700Bold" }}>
          Update
        </Text>
      </Pressable>
    </View>
  );
};

const StockChart = ({ points, chartBounds }) => {
  const { path: areaPath } = useAreaPath(points.highTmp, chartBounds.bottom, {
    curveType: "natural",
  });
  const { path: linePath } = useLinePath(points.highTmp, {
    curveType: "natural",
  });

  return (
    <>
      <Group>
        <Path path={areaPath} style="fill">
          <LinearGradient
            start={vec(0, 0)}
            end={vec(chartBounds.top, chartBounds.bottom)}
            colors={["#CFDACC", "white"]}
          />
        </Path>
        <Path
          path={linePath}
          style="stroke"
          strokeWidth={4}
          color={COLOURS.darkGreen}
        />
      </Group>
    </>
  );
};

export default HealthCard;
