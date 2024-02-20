import { View, Text, Pressable } from 'react-native'
import React from 'react'
import COLOURS from '../../constants/colours'

const FormSubmissionButton = ({onPress, email, password, firstName, lastName, text}) => {

  let opacityStyle;
  if (email && password.length > 6) {
    opacityStyle = 1
  }

  if (firstName && lastName) {
    opacityStyle = 1
  }



  return (
    <Pressable
          onPress={onPress}
          style={{
            width: "100%",
            height: 44,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLOURS.darkGreen,
            opacity: opacityStyle ? opacityStyle : 0.4,
          }}
        >
          <Text
            style={{
              color: "#F7F6EF",
              fontFamily: "Mulish_600SemiBold",
              fontSize: 14,
            }}
          >
            {text || 'Create an account'}
          </Text>
        </Pressable>
  )
}

export default FormSubmissionButton