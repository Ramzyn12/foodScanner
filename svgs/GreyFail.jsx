import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from '../constants/colours'

const GreyFail = ({ circleSize, crossSize }) => {
  return (
    <View
      style={{
        width: circleSize || 12,
        height: circleSize || 12,
        borderRadius: circleSize || 12,
        backgroundColor: '#636566',
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={crossSize || "6"}
        height={crossSize || "6"}
        viewBox="0 0 14 13"
        fill="none"
      >
        <Path
          d="M13.1324 1.1086C13.3765 0.864521 13.3765 0.468792 13.1324 0.224715C12.8884 -0.0193629 12.4926 -0.0193629 12.2486 0.224715L6.85715 5.61612L1.46575 0.224717C1.22167 -0.0193604 0.82594 -0.0193604 0.581862 0.224717C0.337784 0.468795 0.337784 0.864523 0.581862 1.1086L5.97326 6.5L0.581884 11.8914C0.337807 12.1355 0.337807 12.5312 0.581884 12.7753C0.825962 13.0193 1.22169 13.0193 1.46577 12.7753L6.85715 7.38389L12.2485 12.7753C12.4926 13.0193 12.8883 13.0193 13.1324 12.7753C13.3765 12.5312 13.3765 12.1355 13.1324 11.8914L7.74103 6.5L13.1324 1.1086Z"
          fill="white"
        />
      </Svg>
    </View>
  );
};

export default GreyFail;
