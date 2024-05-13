import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import TopActions from './TopActions'

const LoadingGroceries = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TopActions />
      <View style={{gap: 14, padding: 20}}>
         {Array.from({ length: 5 }, (_, index) => (
        <View
          key={index}
          style={{
            height: 60,
            borderRadius: 12,
            backgroundColor: "#F5F5F5",
            // backgroundColor: "blue",
          }}
        />
      ))}
      </View>
     
    </SafeAreaView>
  )
}

export default LoadingGroceries