import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ClearIcon from '../../svgs/ClearIcon'
import { useNavigation } from '@react-navigation/native'

const LoadingFoodDetails = () => {
  const navigation = useNavigation()

  return (
    <View style={{flex: 1, padding: 20, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row', gap: 14}}>
        <View style={{width: 60, height: 60, borderRadius: 20, backgroundColor: '#F5F5F5'}} />
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View style={{ height: 16, borderRadius: 12, backgroundColor: '#F5F5F5'}} />
          <View style={{ height: 36, borderRadius: 12, backgroundColor: '#F5F5F5'}} />
        </View>
        <Pressable style={{alignSelf: 'flex-start'}} onPress={() => navigation.goBack()}>
          <ClearIcon size={28} />
        </Pressable>
      </View>
      <View style={{ width: '100%', height: 135, marginTop: 30, borderRadius: 20, backgroundColor: '#F5F5F5'}}/>
      <View style={{ width: '100%', height: 430, marginTop: 20, borderRadius: 20, backgroundColor: '#F5F5F5'}}/>
      <View style={{ width: '100%', flex: 1, marginTop: 20, borderRadius: 20, backgroundColor: '#F5F5F5'}}/>
    </View>
  )
}

export default LoadingFoodDetails