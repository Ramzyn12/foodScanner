import { View, Text } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const BirthQuestion = () => {
  return (
    <View>
       <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
        />
    </View>
  )
}

export default BirthQuestion