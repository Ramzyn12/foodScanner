import { View, Text } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const XIcon = ({colour, size}) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || "12"}
    height={size || "12"}
    viewBox="0 0 12 12"
    fill="none"
  >
    <Path
      d="M11.6478 1.14775C11.8674 0.928078 11.8674 0.571922 11.6478 0.352252C11.4281 0.132583 11.0719 0.132583 10.8523 0.352252L6.00001 5.20452L1.14775 0.352255C0.928078 0.132585 0.571922 0.132585 0.352252 0.352255C0.132583 0.571925 0.132583 0.92808 0.352252 1.14775L5.20451 6.00001L0.352273 10.8523C0.132603 11.0719 0.132603 11.4281 0.352273 11.6477C0.571943 11.8674 0.928098 11.8674 1.14777 11.6477L6.00001 6.79551L10.8523 11.6477C11.0719 11.8674 11.4281 11.8674 11.6477 11.6477C11.8674 11.4281 11.8674 11.0719 11.6477 10.8523L6.7955 6.00001L11.6478 1.14775Z"
      fill={colour || "#F7F6EF"}
    />
  </Svg>
  )
}

export default XIcon