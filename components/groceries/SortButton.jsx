import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";
import ContextMenu from "react-native-context-menu-view";
import UpDownIcon from "../../svgs/UpDownIcon";
import DropdownIcon from "../../svgs/DropdownIcon";
import { useSelector } from "react-redux";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const SortButton = ({ onPress }) => {
  const sortPreference = useSelector(state => state.grocery.sortPreference)
  const {theme} = useColourTheme()
  return (
    <ContextMenu
      actions={[
        { title: "Manual", selected: sortPreference === 'Manual' },
        { title: "Date added", selected: sortPreference === 'Date added' },
        { title: "Title", selected: sortPreference === 'Title'  },
      ]}
      dropdownMenuMode={true}
      onPress={onPress}
    >
    <Pressable style={[styles.container, {borderColor: themedColours.stroke[theme]}]}>
        <UpDownIcon color={themedColours.primaryText[theme]}  />
        <Text style={[styles.buttonText, {color: themedColours.primaryText[theme]}]}>{sortPreference}</Text>
        <DropdownIcon color={themedColours.primaryText[theme]} />
      </Pressable>
    </ContextMenu>
  );
};

export default SortButton;

const styles = StyleSheet.create({
  container: {
    height: 36,
    paddingHorizontal: 15,
    gap: 8,
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Mulish_600SemiBold",
    color: COLOURS.nearBlack,
  },
});
