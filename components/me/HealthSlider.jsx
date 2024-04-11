import { View, Text } from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { Slider } from "@rneui/themed";
const padding = 20;
const windowWidth = Dimensions.get("window").width;
const sliderWidth = windowWidth - 2 * padding;
import COLOURS from "../../constants/colours";


const HealthSlider = ({value, setValue}) => {
  const [thumbSize, setThumbSize] = useState(24); //34
  const [valueBoxSize, setValueBoxSize] = useState(37); //54
  const [valueTextSize, setValueTextSize] = useState(14); //24
  const [extraLeft, setExtraLeft] = useState(0)

  const handleSlidingStart = () => {
    setThumbSize(34);
    setValueBoxSize(54);
    setValueTextSize(24);
    setExtraLeft(0)
  };
  const handleSlidingEnd = () => {
    setThumbSize(24);
    setValueBoxSize(37);
    setValueTextSize(14);
    setExtraLeft(value)
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
        thumbTintColor={COLOURS.darkGreen}
        minimumTrackTintColor={COLOURS.darkGreen}
        maximumTrackTintColor={"#F7F6EF"}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontFamily: "Mulish_700Bold",
            fontSize: 14,
            color: "#636566",
          }}
        >
          None
        </Text>
        <Text
          style={{
            fontFamily: "Mulish_700Bold",
            fontSize: 14,
            color: "#636566",
          }}
        >
          Extreme
        </Text>
      </View>
      <View
        style={{
          width: valueBoxSize,
          height: valueBoxSize,
          position: "absolute",
          borderWidth: 1,
          borderColor: COLOURS.lightGray,
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
            color: "#636566",
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
