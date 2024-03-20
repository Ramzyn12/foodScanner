import { View, Text } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const PlusIcon = ({colour, size}) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || "18"}
    height={size || "18"}
    viewBox="0 0 18 18"
    fill="none"
  >
    <Path
      d="M9.75 1C9.75 0.585786 9.41421 0.25 9 0.25C8.58579 0.25 8.25 0.585786 8.25 1L8.25 8.25H1C0.585786 8.25 0.25 8.58579 0.25 9C0.25 9.41421 0.585786 9.75 1 9.75H8.25V17C8.25 17.4142 8.58579 17.75 9 17.75C9.41421 17.75 9.75 17.4142 9.75 17V9.75H17C17.4142 9.75 17.75 9.41421 17.75 9C17.75 8.58579 17.4142 8.25 17 8.25H9.75L9.75 1Z"
      fill={colour || "#1F2C35"}
    />
  </Svg>
  )
}

export default PlusIcon