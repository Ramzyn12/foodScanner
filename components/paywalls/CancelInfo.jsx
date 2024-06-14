import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useColourTheme } from '../../context/Themed'
import { themedColours } from '../../constants/themedColours'
import { useCustomerInfo } from '../../hooks/useCustomerInfo'

const CancelInfo = () => {
  const {theme} = useColourTheme()


  return (
    <View style={{backgroundColor: themedColours.secondaryBackground[theme], padding: 14, gap: 14, borderRadius: 12}}>
      <Text style={{fontFamily: 'Mulish_700Bold', color: themedColours.primaryText[theme], fontSize: 17}}>How can I cancel?</Text>
      <Text style={{fontFamily: 'Mulish_500Medium', color: themedColours.secondaryText[theme], fontSize: 14}}>It’s easy and you can cancel any time. Head to your iCloud Settings, tap on Subscriptions, tap on Ivy, then tap Cancel Subscription. </Text>
    </View>
  )
}

export default CancelInfo