import { View, Text } from "react-native";
import React from "react";
import OverviewHeader from "./OverviewHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLOURS from "../../constants/colours";
import { Skeleton } from "moti/skeleton";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const LoadingWeeklyOverview = ({ route }) => {
  const insets = useSafeAreaInsets();
  const {theme} = useColourTheme()

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: themedColours.primaryBackground[theme] }}>
      <OverviewHeader week={route.params.week} title={route.params.title} />
      <View style={{ padding: 20 }}>
        <Text
          style={{
            marginBottom: 2,
            fontSize: 11,
            fontFamily: "Mulish_800ExtraBold",
            color: themedColours.primary[theme],
          }}
        >
          WEEK {route.params.week}
        </Text>
        <Text
          style={{
            marginBottom: 14,
            fontSize: 34,
            fontFamily: "Mulish_700Bold",
            color: themedColours.primaryText[theme],
          }}
        >
          {route.params.title}
        </Text>
        <Skeleton
          colors={[
            themedColours.secondaryBackground[theme],
            themedColours.stroke[theme],
            themedColours.secondaryBackground[theme],
          ]} // Custom colors for the skeleton
          radius={20}
          height={60}
          width={"100%"}
        />
        {/* <View style={{height: 28, borderRadius: 20, width: '100%', marginTop: 14,  backgroundColor: '#F5F5F5'}} /> */}
        <View style={{ marginTop: 14 }}>
          <Skeleton
            colors={[
              themedColours.secondaryBackground[theme],
              themedColours.stroke[theme],
              themedColours.secondaryBackground[theme],
            ]} // Custom colors for the skeleton
            radius={20}
            height={28}
            width={"100%"}
          />
        </View>

        <View style={{ marginTop: 14 }}>
          <Skeleton
            colors={[
              themedColours.secondaryBackground[theme],
              themedColours.stroke[theme],
              themedColours.secondaryBackground[theme],
            ]} // Custom colors for the skeleton
            radius={20}
            height={28}
            width={"75%"}
          />
        </View>
        <View style={{ marginTop: 14, marginBottom: 40 }}>
          <Skeleton
            colors={[
              themedColours.secondaryBackground[theme],
              themedColours.stroke[theme],
              themedColours.secondaryBackground[theme],
            ]} // Custom colors for the skeleton
            radius={20}
            height={28}
            width={"100%"}
          />
        </View>
        {Array.from({ length: 7 }, (_, index) => (
          <View key={index} style={{ marginBottom: 14 }}>
            <Skeleton
              colors={[
                themedColours.secondaryBackground[theme],
                themedColours.stroke[theme],
                themedColours.secondaryBackground[theme],
              ]} // Custom colors for the skeleton
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
