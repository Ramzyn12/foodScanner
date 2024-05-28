import { View, Text } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const DangerTriangle = ({color}) => {
  return (
    <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="21"
          viewBox="0 0 22 21"
          fill="none"
        >
          <Path
            d="M10.9998 6V12M10.9998 20C6.45265 20 4.17906 20 2.86474 19.0451C1.71832 18.2122 0.979175 16.9319 0.831053 15.5226C0.661236 13.9069 1.79803 11.938 4.07161 8C6.3452 4.06204 7.48199 2.09306 8.96613 1.43227C10.2607 0.855909 11.739 0.855909 13.0335 1.43227C14.5176 2.09306 15.6544 4.06204 17.928 8C20.2016 11.938 21.3384 13.9069 21.1686 15.5226C21.0205 16.9319 20.2813 18.2122 19.1349 19.0451C17.8206 20 15.547 20 10.9998 20Z"
            stroke={color || "#1F2C35"}
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <Path
            d="M12 15C12 15.5523 11.5523 16 11 16C10.4477 16 10 15.5523 10 15C10 14.4477 10.4477 14 11 14C11.5523 14 12 14.4477 12 15Z"
            fill={color || "#1F2C35"}
          />
        </Svg>
  )
}

export default DangerTriangle