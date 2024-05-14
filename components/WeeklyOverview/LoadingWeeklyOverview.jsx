import { View, Text } from "react-native";
import React from "react";
import OverviewHeader from "./OverviewHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLOURS from "../../constants/colours";
import { Skeleton } from "moti/skeleton";

const LoadingWeeklyOverview = ({ route }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: "white" }}>
      <OverviewHeader week={route.params.week} title={route.params.title} />
      <View style={{ padding: 20 }}>
        <Text
          style={{
            marginBottom: 2,
            fontSize: 11,
            fontFamily: "Mulish_800ExtraBold",
            color: COLOURS.darkGreen,
          }}
        >
          WEEK {route.params.week}
        </Text>
        <Text
          style={{
            marginBottom: 14,
            fontSize: 34,
            fontFamily: "Mulish_700Bold",
            color: COLOURS.nearBlack,
          }}
        >
          {route.params.title}
        </Text>
        <Skeleton
          colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
          radius={20}
          height={60}
          width={"100%"}
        />
        {/* <View style={{height: 28, borderRadius: 20, width: '100%', marginTop: 14,  backgroundColor: '#F5F5F5'}} /> */}
        <View style={{ marginTop: 14 }}>
          <Skeleton
            colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
            radius={20}
            height={28}
            width={"100%"}
          />
        </View>

        <View style={{ marginTop: 14 }}>
          <Skeleton
            colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
            radius={20}
            height={28}
            width={"75%"}
          />
        </View>
        <View style={{ marginTop: 14, marginBottom: 40 }}>
          <Skeleton
            colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
            radius={20}
            height={28}
            width={"100%"}
          />
        </View>
        {Array.from({ length: 7 }, (_, index) => (
          <View key={index} style={{ marginBottom: 14 }}>
            <Skeleton
              colors={["#F5F5F5", COLOURS.lightGray, "#F5F5F5"]} // Custom colors for the skeleton
              radius={20}
              height={95}
              width={"100%"}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default LoadingWeeklyOverview;
