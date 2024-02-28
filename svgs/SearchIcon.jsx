import { View, Text } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const SearchIcon = () => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <Path
          d="M13.197 11.4698C12.9041 11.1769 12.4292 11.1769 12.1363 11.4697C11.8434 11.7626 11.8434 12.2375 12.1363 12.5304L13.197 11.4698ZM14.8029 15.197C15.0958 15.4899 15.5707 15.4899 15.8636 15.197C16.1564 14.9042 16.1565 14.4293 15.8636 14.1364L14.8029 15.197ZM12.1363 12.5304L14.8029 15.197L15.8636 14.1364L13.197 11.4698L12.1363 12.5304ZM7.33325 11.9167C4.43376 11.9167 2.08325 9.56618 2.08325 6.66669H0.583252C0.583252 10.3946 3.60533 13.4167 7.33325 13.4167V11.9167ZM12.5833 6.66669C12.5833 9.56618 10.2327 11.9167 7.33325 11.9167V13.4167C11.0612 13.4167 14.0833 10.3946 14.0833 6.66669H12.5833ZM7.33325 1.41669C10.2327 1.41669 12.5833 3.76719 12.5833 6.66669H14.0833C14.0833 2.93877 11.0612 -0.083313 7.33325 -0.083313V1.41669ZM7.33325 -0.083313C3.60533 -0.083313 0.583252 2.93877 0.583252 6.66669H2.08325C2.08325 3.76719 4.43376 1.41669 7.33325 1.41669V-0.083313Z"
          fill={'#2D264B'}
        />
      </Svg>
  )
}

export default SearchIcon