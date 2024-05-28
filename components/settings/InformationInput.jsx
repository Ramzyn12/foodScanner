import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import COLOURS from "../../constants/colours";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const InformationInput = ({ inputText, defaultValue }) => {
  const {theme} = useColourTheme()
  return (
    <View
      style={{
        width: "100%",
        height: 58,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: themedColours.stroke[theme],
        padding: 18,
        gap: 6,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontFamily: "Mulish_700Bold",
          color: themedColours.primaryText[theme],
        }}
      >
        {inputText}
      </Text>
      <TextInput
        readOnly
        style={{ fontFamily: "Mulish_400Regular", fontSize: 14, color: themedColours.secondaryText[theme] }}
        defaultValue={defaultValue}
      />
    </View>
  );
};

export default InformationInput;
