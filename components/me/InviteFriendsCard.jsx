import { View, Text, Pressable } from 'react-native'
import React from 'react'
import COLOURS from '../../constants/colours'
import RainingHeart from '../../svgs/RainingHeart'

const InviteFriendsCard = () => {
  return (
    <View style={{borderWidth: 1, borderColor: COLOURS.lightGray, borderRadius: 20, padding: 20, gap: 20, alignItems: 'center'}}>
      <RainingHeart />
      <View style={{gap: 8, paddingHorizontal: 40}}>
        <Text style={{fontFamily: 'Mulish_700Bold', textAlign: 'center', color: COLOURS.nearBlack, fontSize: 19}}>Live Longer Together</Text>
        <Text style={{fontFamily: 'Mulish_400Regular', textAlign: 'center', color: '#636566', fontSize: 14}}>Invite friends and family to join you on your clean eating journey.</Text>
      </View>
      <Pressable style={{height: 44, borderRadius: 12, width: '100%', backgroundColor: COLOURS.darkGreen, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontFamily: 'Mulish_700Bold', color: '#F7F6EF', fontSize: 14}}>Invite friends</Text>
      </Pressable>
    </View>
  )
}

export default InviteFriendsCard