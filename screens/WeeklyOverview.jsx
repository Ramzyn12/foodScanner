import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowLeft from "../svgs/ArrowLeft";
import COLOURS from "../constants/colours";
import OverviewHeader from "../components/WeeklyOverview/OverviewHeader";
import WeekOverviewLines from "../components/WeeklyOverview/WeekOverviewLines";
import DaysLeftCard from "../components/WeeklyOverview/DaysLeftCard";
import DayAccordian from "../components/WeeklyOverview/DayAccordian";



const WeeklyOverview = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: "white" }}>
      <OverviewHeader />
      <ScrollView>
        {/* UPPER */}
        <View style={{ gap: 20, padding: 20 }}>
          <View>
            <Text style={{marginBottom: 2, fontSize: 11, fontFamily: 'Mulish_800ExtraBold', color: COLOURS.darkGreen}}>WEEK 1</Text>
            <Text style={{marginBottom: 14, fontSize: 34, fontFamily: 'Mulish_700Bold', color: COLOURS.nearBlack}}>Strong Cravings</Text>
            <DaysLeftCard />
            {/* Description */}
            <Text style={{fontSize: 14, fontFamily: 'Mulish_400Regular', color: COLOURS.nearBlack}}>
              Welcome to your first week of eliminating processed foods. It goes
              without saying that this will be the most difficult week of your
              journey as your body and mind scream out for refined sugars and
              processed fats. Don’t forget to make good use of our scanner to
              ensure that what you are eating is not processed.{" "}
            </Text>
          </View>
          {/* ACCORDIANS */}
          <View style={{ gap: 20 }}>
            <DayAccordian />
            <DayAccordian />
            <DayAccordian />
            <DayAccordian />
            <DayAccordian />
            <DayAccordian />
            <DayAccordian />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WeeklyOverview;
