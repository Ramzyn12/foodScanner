import { View, Text, Button } from 'react-native'
import React from 'react'

const Me = ({navigation}) => {
  return (
    <View>
      <Text>Me</Text>
      <Button onPress={() => navigation.navigate('Settings')} title='Settings' />
    </View>
  )
}

export default Me