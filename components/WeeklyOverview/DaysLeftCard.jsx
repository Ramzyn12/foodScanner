import { View, Text } from "react-native";
import React from "react";
import WeekOverviewLines from "./WeekOverviewLines";

const DaysLeftCard = () => {
  return (
    <View style={{padding: 20, marginBottom: 14, gap: 14, backgroundColor: '#F7F6EF', borderRadius: 20}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 11, fontFamily: 'Mulish_800ExtraBold', color: '#636566' }}>DAY 3</Text>
        <Text style={{fontSize: 11, fontFamily: 'Mulish_800ExtraBold', color: '#636566' }}>5 days remaining</Text>
      </View>
      <WeekOverviewLines />
    </View>
  );
};

export default DaysLeftCard;
