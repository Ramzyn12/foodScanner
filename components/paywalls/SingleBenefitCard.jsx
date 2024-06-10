import { View, Text } from 'react-native'
import React from 'react'
import { themedColours } from '../../constants/themedColours'
import { useColourTheme } from '../../context/Themed'

const SingleBenefitCard = ({svg, title, subtitle}) => {
  const {theme} = useColourTheme()
  return (
    <View
    style={{
      backgroundColor: themedColours.secondaryBackground[theme],
      padding: 14,
      gap: 14,
      flexDirection: "row",
      borderRadius: 12,
    }}
  >
    {svg}
    <View style={{ flex: 1, gap: 8, }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Mulish_700Bold",
          color: themedColours.primaryText[theme],
        }}
      >
        {title}
      </Text>
      <Text  style={{
          fontSize: 14,
          fontFamily: "Mulish_400Regular",
          color: themedColours.secondaryText[theme],
        }}>
        {subtitle}
      </Text>
    </View>
  </View>
  )
}

export default SingleBenefitCard