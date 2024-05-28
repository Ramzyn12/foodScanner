import { View, Text } from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { Slider } from "@rneui/themed";
const padding = 20;
const windowWidth = Dimensions.get("window").width;
const sliderWidth = windowWidth - 2 * padding;
import COLOURS from "../../constants/colours";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const HealthSlider = ({ value, setValue, metricType }) => {
  const [thumbSize, setThumbSize] = useState(24); //34
  const [valueBoxSize, setValueBoxSize] = useState(37); //54
  const [valueTextSize, setValueTextSize] = useState(14); //24
  const [extraLeft, setExtraLeft] = useState(0);
  const {theme} = useColourTheme()

  const labels =
    metricType === "Energy"
      ? ["Very Low", "Very High"]
      : metricType === "Anxiety"
      ? ["None", "Extreme"]
      : ["Terrible", "Great"];

  const handleSlidingStart = () => {
    setThumbSize(34);
    setValueBoxSize(54);
    setValueTextSize(24);
    setExtraLeft(0);
  };
  const handleSlidingEnd = () => {
    setThumbSize(24);
    setValueBoxSize(37);
    setValueTextSize(14);
    setExtraLeft(value);
  };

  return (
    <View style={{ gap: 6 }}>
      <Slider
        // style={{ width: '100%'}}
        value={value}
        onValueChange={setValue}
        minimumValue={0}
        maximumValue={10}
        step={1}
        onSlidingStart={handleSlidingStart}
        onSlidingComplete={handleSlidingEnd}
        trackStyle={{ height: 10, borderRadius: 12 }}
        thumbStyle={{ width: thumbSize, height: thumbSize }}
        thumbTouchSize={{ width: 60, height: 60 }}
        thumbTintColor={themedColours.primary[theme]}
        minimumTrackTintColor={themedColours.primary[theme]}
        maximumTrackTintColor={themedColours.tertiaryBackground[theme]}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontFamily: "Mulish_700Bold",
            fontSize: 14,
            color: themedColours.secondaryText[theme],
          }}
        >
          {labels[0]}
        </Text>
        <Text
          style={{
            fontFamily: "Mulish_700Bold",
            fontSize: 14,
            color: themedColours.secondaryText[theme],
          }}
        >
           {labels[1]}
        </Text>
      </View>
      <View
        style={{
          width: valueBoxSize,
          height: valueBoxSize,
          position: "absolute",
          borderWidth: 1,
          borderColor: themedColours.stroke[theme],
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          bottom: 80,
          left:
            0 -
            (valueBoxSize - thumbSize) / 2 +
            (value * sliderWidth) / 11 +
            extraLeft,
        }}
      >
        <Text
          style={{
            fontSize: valueTextSize,
            color: themedColours.secondaryText[theme],
            fontFamily: "Mulish_700Bold",
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

export default HealthSlider;
