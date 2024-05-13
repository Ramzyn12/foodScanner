import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import COLOURS from "../../constants/colours";
import ContextMenu from "react-native-context-menu-view";
import UpDownIcon from "../../svgs/UpDownIcon";
import DropdownIcon from "../../svgs/DropdownIcon";
import { useSelector } from "react-redux";

const SortButton = ({ onPress }) => {
  const sortPreference = useSelector(state => state.grocery.sortPreference)

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
      <Pressable style={styles.container}>
        <UpDownIcon />
        <Text style={styles.buttonText}>{sortPreference}</Text>
        <DropdownIcon />
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
