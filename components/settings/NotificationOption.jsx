import { View, Text, Switch, Pressable } from "react-native";
import React, { useState } from "react";
import Clock from "../../svgs/Clock";
import ArrowDownShort from "../../svgs/ArrowDownShort";
import COLOURS from '../../constants/colours'
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

const NotificationOption = ({title, description, time }) => {
  const [timeSet, setTimeSet] = useState(new Date(2020, 0, 1, 9, 0)); // initial time set to 09:00
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [shouldNotify, setShouldNotify] = useState(false)

  const handlePress = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: 'Test From notifications',
        data: { data: 'goes here' },
      },
      trigger: { hour: 13, minute: 43, repeats: true }, //1:43pm everyday
    });
  }

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setTimeSet(selectedTime);
    }
  };

  const handleSaveTime = () => {
    // send to backend here

    // then close
    setShowTimePicker(false)
  }

  const handleDropdownPress = () => {
    if (showTimePicker === true) {
      // Go back to original time
      setTimeSet(new Date(2020, 0, 1, 9, 0))
    }
    setShowTimePicker(prev => !prev)
  }


  const formattedTime = `${timeSet.getHours().toString().padStart(2, '0')}:${timeSet.getMinutes().toString().padStart(2, '0')}`;

  return (
    <Pressable onPress={handlePress} style={{backgroundColor: '#F5F5F5', borderRadius: 20 }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14}}>
        <View style={{gap: 2}}>
          <Text style={{ fontSize: 16, fontFamily: 'Mulish_500Medium', color: COLOURS.nearBlack}}>{title}</Text>
          <Text style={{color: '#636566', fontSize: 11, fontFamily: 'Mulish_700Bold'}}>{description}</Text>
        </View>
        <Switch value={shouldNotify} onValueChange={setShouldNotify} />
      </View>
      {shouldNotify && <Pressable onPress={handleDropdownPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20, paddingVertical: 14 }}>
        <Clock />
        <Text style={{flex: 1, fontSize: 16, fontFamily: 'Mulish_500Medium', color: COLOURS.nearBlack}}>{formattedTime}</Text>
        <ArrowDownShort />
      </Pressable>}
       {showTimePicker &&<View>
        <DateTimePicker
          value={timeSet}
          mode="time"
          display="spinner"
          onChange={handleTimeChange}
          style={{ alignItems: 'flex-start'}}
        />
        <Pressable onPress={handleSaveTime} style={{height: 44, backgroundColor: COLOURS.darkGreen, justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
          <Text style={{color: 'white', fontSize: 18, fontFamily: 'Mulish_700Bold'}}>Save</Text>
        </Pressable>
       </View> }
    </Pressable>
  );
};

export default NotificationOption;
