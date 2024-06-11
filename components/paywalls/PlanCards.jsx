import { View, Text } from 'react-native'
import React from 'react'
import SinglePlanCard from './SinglePlanCard'

const PlanCards = ({freeTrial}) => {
  return (
    <View style={{gap: 14}}>
      <SinglePlanCard timeframe={'ANNUAL'} price={'£39.99'} savePercent={'70'} showSubtitle={freeTrial} subtitle={'7 DAY FREE TRIAL INCLUDED'} />
      <SinglePlanCard timeframe={'MONTHLY'} price={'£9.99'} showSubtitle={true} subtitle={'CANCEL ANYTIME'} />
      <SinglePlanCard timeframe={'LIFETIME'} price={'£199'} showSubtitle={true} subtitle={'ONE-TIME PAYMENT'} />

    </View>
  )
}

export default PlanCards