import { View, Text } from 'react-native'
import React from 'react'
import SinglePlanCard from './SinglePlanCard'

const PlanCards = () => {
  return (
    <View style={{gap: 14}}>
      <SinglePlanCard timeframe={'ANNUAL'} price={'£39.99'} savePercent={'70'} subtitle={'7 DAY FREE TRIAL INCLUDED'} />
      <SinglePlanCard timeframe={'MONTHLY'} price={'£9.99'} subtitle={'CANCEL ANYTIME'} />
      <SinglePlanCard timeframe={'LIFETIME'} price={'£199'} subtitle={'ONE-TIME PAYMENT'} />

    </View>
  )
}

export default PlanCards