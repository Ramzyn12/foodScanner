import { View, Text } from "react-native";
import React from "react";
import OverviewHeader from "./OverviewHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLOURS from "../../constants/colours";

const LoadingWeeklyOverview = ({ route }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: "white" }}>
      <OverviewHeader week={route.params.week} title={route.params.title} />
      <View style={{padding: 20}}>
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
        <View style={{height: 60, borderRadius: 20, width: '100%', backgroundColor: '#F5F5F5'}} />
        <View style={{height: 28, borderRadius: 20, width: '100%', marginTop: 14,  backgroundColor: '#F5F5F5'}} />
        <View style={{height: 28, borderRadius: 20, width: '75%',  marginTop: 14, backgroundColor: '#F5F5F5'}} />
        <View style={{height: 28, borderRadius: 20, width: '50%',  marginTop: 14, marginBottom: 40, backgroundColor: '#F5F5F5'}} />
        <View></View>
        {Array.from({ length: 7 }, (_, index) => (
          <View
            key={index}
            style={{
              height: 95,
              borderRadius: 20,
              backgroundColor: "#F5F5F5",
              width: '100%',
              marginBottom: 14
            }}
          />
        ))}
      </View>

    </View>
  );
};

export default LoadingWeeklyOverview;
