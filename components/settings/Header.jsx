import { View, Text, Pressable } from "react-native";
import React from "react";
import ArrowLeft from "../../svgs/ArrowLeft";
import COLOURS from "../../constants/colours";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";
import MoreCircle from "../../svgs/MoreCircle";
import ContextMenu from "react-native-context-menu-view";

const Header = ({ headerText, onNavigate, weightUnit, onUnitChange }) => {
  const { theme } = useColourTheme();
  const isWeight = headerText === "Weight";
  
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
        <ArrowLeft
          color={themedColours.primaryText[theme]}
          width={5.5}
          height={11.5}
        />
      </Pressable>
      <Text
        style={{
          fontSize: 19,
          fontFamily: "Mulish_600SemiBold",
          color: themedColours.primaryText[theme],
          textAlign: "center",
          position: "relative",
        }}
      >
        {headerText}
      </Text>
      {isWeight && (
        <ContextMenu
          actions={[{ title: "Imperial", selected: weightUnit === 'imperial' }, { title: "Metric",  selected: weightUnit === 'metric' }]}
          dropdownMenuMode={true}
          onPress={(e) => {
            onUnitChange(e.nativeEvent.name.toLowerCase())
            // console.log(e.nativeEvent.name, e.nativeEvent.index);
          }}
          style={{ position: "absolute", right: 0, top: -20, zIndex: 40000 }}
        >
          <View style={{ padding: 25 }}>
            <MoreCircle />
          </View>
        </ContextMenu>
      )}
    </View>
  );
};

export default Header;
