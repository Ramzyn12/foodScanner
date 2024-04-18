import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from '../../constants/colours'

const AccordianMetricLog = ({metric}) => {

  const { metricValue, unitOfMeasure } = Object.values(metric)[0]; // Assuming metric is an object like { "Weight": { "metricValue": 3, "unitOfMeasure": "kg" } }
  
  const metricName = Object.keys(metric)[0];
  const displayValue = metricValue !== null ? `${metricValue} ${unitOfMeasure || ''}`.trim() : "No Data";

  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: COLOURS.lightGray,
        gap: 14,
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 20,
      }}
    >
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <Path
          d="M11.25 25.525L3.48755 17.7625L7.02505 14.225L11.25 18.4625L23.6 6.10001L27.1375 9.63751L11.25 25.525Z"
          fill="#DEDEDE"
        />
      </Svg>
      <Text
        style={{
          fontSize: 16,
          flex: 1,
          fontFamily: "Mulish_700Bold",
          color: COLOURS.nearBlack,
        }}
      >
        {metricName}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Mulish_700Bold",
          color: COLOURS.darkGreen,
        }}
      >
        {displayValue}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Mulish_700Bold",
          color: COLOURS.darkGreen,
        }}
      >
        Log
      </Text>
    </View>
  );
};

export default AccordianMetricLog;
