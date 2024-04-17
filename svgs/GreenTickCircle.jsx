import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from '../constants/colours'

const GreenTickCircle = ({ size }) => {
  return (
    <View
      style={{
        width: 12,
        height: 12,
        borderRadius: 12,
        backgroundColor: COLOURS.darkGreen,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width="7" height="5" viewBox="0 0 15 11" fill="none">
        <Path
          d="M14.861 1.73344C15.082 1.46827 15.0461 1.07417 14.781 0.85319C14.5158 0.632213 14.1217 0.66804 13.9007 0.933213L9.40847 6.32389C8.5061 7.40673 7.87132 8.16611 7.32074 8.66329C6.783 9.14887 6.41189 9.3032 6.0475 9.3032C5.68312 9.3032 5.31201 9.14887 4.77426 8.66329C4.22368 8.16611 3.5889 7.40672 2.68653 6.32389L1.52764 4.93321C1.30666 4.66804 0.912559 4.63221 0.647386 4.85319C0.382213 5.07417 0.346385 5.46827 0.567363 5.73344L1.75842 7.16271C2.62114 8.19801 3.31205 9.02712 3.93652 9.59102C4.58156 10.1735 5.24095 10.5532 6.0475 10.5532C6.85405 10.5532 7.51344 10.1735 8.15849 9.59102C8.78295 9.02713 9.47384 8.19803 10.3366 7.16274L14.861 1.73344Z"
          fill="white"
        />
      </Svg>
    </View>
  );
};

export default GreenTickCircle;
