import { View, Text, Pressable } from "react-native";
import React from "react";
import ArrowLeft from "../../svgs/ArrowLeft";
import COLOURS from "../../constants/colours";

const Header = ({headerText, onNavigate}) => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 25,
        paddingBottom: 15,
        marginTop: 8,
        flexDirection: "row",
      }}
    >
      <Pressable
        hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}
        onPress={onNavigate}
        style={{ position: "absolute", left: 25, top: 5 }}
      >
        <ArrowLeft width={5.5} height={11.5} />
      </Pressable>
      <Text
        style={{
          fontSize: 19,
          fontFamily: "Mulish_600SemiBold",
          color: COLOURS.nearBlack,
          textAlign: "center",
          position: "relative",
        }}
      >
        {headerText}
      </Text>
    </View>
  );
};

export default Header;