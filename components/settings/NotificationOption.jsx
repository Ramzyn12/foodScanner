import { View, Text, Switch } from "react-native";
import React from "react";
import Clock from "../../svgs/Clock";
import ArrowDownShort from "../../svgs/ArrowDownShort";
import COLOURS from '../../constants/colours'

const NotificationOption = ({title, description, time }) => {
  return (
    <View style={{backgroundColor: '#F5F5F5', borderRadius: 20 }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14}}>
        <View style={{gap: 2}}>
          <Text style={{ fontSize: 16, fontFamily: 'Mulish_500Medium', color: COLOURS.nearBlack}}>{title}</Text>
          <Text style={{color: '#636566', fontSize: 11, fontFamily: 'Mulish_700Bold'}}>{description}</Text>
        </View>
        <Switch />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20, paddingVertical: 14}}>
        <Clock />
        <Text style={{flex: 1, fontSize: 16, fontFamily: 'Mulish_500Medium', color: COLOURS.nearBlack}}>09:00</Text>
        <ArrowDownShort />
      </View>
    </View>
  );
};

export default NotificationOption;