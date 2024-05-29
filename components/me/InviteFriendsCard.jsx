import { View, Text, Pressable } from 'react-native'
import React from 'react'
import COLOURS from '../../constants/colours'
import RainingHeart from '../../svgs/RainingHeart'
import { useColourTheme } from '../../context/Themed'
import { themedColours } from '../../constants/themedColours'

const InviteFriendsCard = () => {
  const {theme} = useColourTheme()

  return (
    <View style={{borderWidth: 1, borderColor: themedColours.stroke[theme], borderRadius: 20, padding: 20, gap: 20, alignItems: 'center'}}>
      <RainingHeart color={themedColours.primaryText[theme]} />
      <View style={{gap: 8, paddingHorizontal: 40}}>
        <Text style={{fontFamily: 'Mulish_700Bold', textAlign: 'center', color: themedColours.primaryText[theme], fontSize: 19}}>Live Longer Together</Text>
        <Text style={{fontFamily: 'Mulish_400Regular', textAlign: 'center', color: themedColours.secondaryText[theme], fontSize: 14}}>Invite friends and family to join you on your clean eating journey.</Text>
      </View>
      <Pressable style={{height: 44, borderRadius: 12, width: '100%', backgroundColor: themedColours.primary[theme], alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontFamily: 'Mulish_700Bold', color: 'white', fontSize: 14}}>Invite friends</Text>
      </Pressable>
    </View>
  )
}

export default InviteFriendsCard