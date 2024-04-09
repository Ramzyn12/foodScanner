import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../components/settings/Header'
import NotificationOption from '../components/settings/NotificationOption'

const Notifications = () => {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Header headerText={'Notifications'} />
      <View style={{padding: 14, gap: 14}}>
        <NotificationOption title={'Health changes'} description={'Notify me when there is a change in my health stats'} />
        <NotificationOption title={'Food tracking reminder'} description={'Remind me to log the food I have eaten'} />
        <NotificationOption title={'Mood tracking reminder'} description={'Remind me to log my mood for the day '} />
        <NotificationOption title={'Daily summary'} description={'Notify me when my daily summary is ready'} />
        <NotificationOption title={'Streaks'} description={'Notify me when I have beaten my best streak'} />
  
      </View>
    </View>
  )
}

export default Notifications