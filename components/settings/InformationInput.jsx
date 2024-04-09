import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import COLOURS from '../../constants/colours'

const InformationInput = ({inputText}) => {
  return (
    <View
      style={{
        width: "100%",
        height: 58,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLOURS.lightGray,
        padding: 18,
        gap: 6,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontFamily: "Mulish_700Bold",
          color: COLOURS.nearBlack,
        }}
      >
        {inputText}
      </Text>
      <TextInput
        style={{ fontFamily: "Mulish_400Regular", fontSize: 14 }}
        defaultValue="Farid"
      />
    </View>
  );
};

export default InformationInput;
