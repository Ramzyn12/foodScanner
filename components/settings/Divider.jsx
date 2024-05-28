import { View, Text } from "react-native";
import React from "react";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const Divider = () => {
  const {theme} = useColourTheme()
  return (
    <View style={{ width: "100%", height: 1, backgroundColor: themedColours.stroke[theme]}}></View>
  );
};

export default Divider;
