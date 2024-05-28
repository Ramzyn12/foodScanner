import { View, Text, Pressable } from "react-native";
import React, { useCallback, useRef } from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";
import LogModal from "../me/LogModal";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const AccordianMetricLog = ({ metric, date }) => {
  const bottomSheetRef = useRef(null);
  const {theme} = useColourTheme()
  const { metricValue, unitOfMeasure } = Object.values(metric)[0]; // Assuming metric is an object like { "Weight": { "metricValue": 3, "unitOfMeasure": "kg" } }

  const metricName = Object.keys(metric)[0];
  const isWeight = metricName === 'Weight'

  const displayValue = metricValue !== null
    ? isWeight
      ? `${metricValue} ${unitOfMeasure || ""}`.trim()
      : `${metricValue} / 10` // Assuming ratings are out of 10
    : "";

  const handleHideModal = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: themedColours.stroke[theme],
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
          fill={metricValue === null ? themedColours.stroke[theme] :  themedColours.primary[theme]}
        />
      </Svg>
      <Text
        style={{
          fontSize: 16,
          flex: 1,
          fontFamily: "Mulish_700Bold",
          color: themedColours.primaryText[theme],
        }}
      >
        {metricName}
      </Text>
      <Text
        style={{
          fontSize: 17,
          fontFamily: "Mulish_700Bold",
          color: themedColours.primaryText[theme],
        }}
      >
        {displayValue}
      </Text>
      <Pressable hitSlop={15} onPress={() => bottomSheetRef.current.present()}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Mulish_700Bold",
            color: themedColours.primary[theme],
          }}
        >
          {metricValue === null ? 'Log' : 'Update'}
        </Text>
      </Pressable>
      <LogModal date={date} onClose={handleHideModal} metricType={metricName} ref={bottomSheetRef} />
    </View>
  );
};

export default AccordianMetricLog;
