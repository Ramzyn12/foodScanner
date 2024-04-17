import { View, Text } from "react-native";
import React, { useState } from "react";
import COLOURS from "../../constants/colours";
import ContextMenu from "react-native-context-menu-view";
import ArrowDownShort from "../../svgs/ArrowDownShort";
import { Pressable } from "react-native";

const ChangeDateDropdown = ({selectedTimeFrame, onTimeFrameChange}) => {

  return (
    <ContextMenu
      style={{
        position: "absolute",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: COLOURS.lightGray,
        borderRadius: 20,
        gap: 14,
        top: 14,
        right: 14,
        zIndex: 2000000,
        paddingHorizontal: 14,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
      }}
      actions={[
        { title: "Week", systemIcon: "calendar" },
        { title: "Month", systemIcon: "calendar" },
        { title: "Year", systemIcon: "calendar" },
      ]}
      dropdownMenuMode={true}
      onPress={(e) => {
        onTimeFrameChange(e.nativeEvent.name)
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Mulish_700Bold",
          color: "#F7F6EF",
        }}
      >
        {selectedTimeFrame}
      </Text>
      <ArrowDownShort color={"#F7F6EF"} width={9} height={4} />
    </ContextMenu>
  );
};

export default ChangeDateDropdown;
