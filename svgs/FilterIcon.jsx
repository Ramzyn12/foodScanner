import { View, Text } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const FilterIcon = () => {
  return (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
      >
        <Path
          d="M2.85434 0.75H11.1882C12.3269 0.75 13.25 1.67311 13.25 2.81183C13.25 3.41831 12.983 3.99404 12.52 4.3858L9.87975 6.61985C8.92541 7.42737 8.375 8.61411 8.375 9.86425V11.1997C8.375 11.6996 8.13581 12.1693 7.73152 12.4634L6.27557 13.5222C5.84875 13.8327 5.25 13.5278 5.25 13V9.77463C5.25 8.58333 4.75 7.44672 3.87183 6.64173L1.43239 4.40557C0.997569 4.00699 0.75 3.44421 0.75 2.85434C0.75 1.69215 1.69215 0.75 2.85434 0.75Z"
          stroke="#1F2C35"
        />
      </Svg>
  )
}

export default FilterIcon