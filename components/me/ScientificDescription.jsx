import { View, Text } from 'react-native'
import React from 'react'
import COLOURS from '../../constants/colours'

const ScientificDescription = ({title, description}) => {
  return (
    <View style={{padding: 20, gap: 20, backgroundColor: '#F7F6EF', borderRadius: 20}}>
      <Text style={{fontSize: 19, fontFamily: 'Mulish_700Bold', color: COLOURS.nearBlack}}>{title}</Text>
      <Text style={{fontSize: 16, fontFamily: 'Mulish_500Medium', color: '#636566'}}>{description}</Text>
    </View>
  )
}

export default ScientificDescription