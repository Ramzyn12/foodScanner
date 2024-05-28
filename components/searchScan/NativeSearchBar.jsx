import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { forwardRef } from "react";
import Animated from "react-native-reanimated";
import COLOURS from "../../constants/colours";
import SearchIcon from "../../svgs/SearchIcon";
import { TextInput } from "react-native";
import ClearIcon from "../../svgs/ClearIcon";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const NativeSearchBar = forwardRef(
  (
    {
      onFocus,
      onClearInput,
      onCancel,
      search,
      animatedCancelBtnStyle,
      updateSearch,
    },
    ref // This is the ref forwarded from the parent component
  ) => {
    const {theme} = useColourTheme()
    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <View style={[styles.inputContainer, {backgroundColor: themedColours.secondaryBackground[theme]}]}>
          <SearchIcon color={themedColours.secondaryText[theme]} />
          <BottomSheetTextInput
            autoCorrect={false}
            ref={ref} // Use the forwarded ref here
            placeholderTextColor={themedColours.secondaryText[theme]}
            placeholder="Search food and drink"
            onFocus={onFocus}
            // value={search} If wanna do this, need to use memo search results
            onChangeText={updateSearch}
            style={{ flex: 1, fontSize: 17, fontFamily: "Mulish_400Regular", color: themedColours.primaryText[theme] }}
          />
          {search.length > 0 && (
            <Pressable onPress={onClearInput}>
              <ClearIcon background={themedColours.stroke[theme]} crossColor={themedColours.secondaryText[theme]} />
            </Pressable>
          )}
        </View>

        <Animated.View style={[animatedCancelBtnStyle]}>
          <Pressable
            hitSlop={{ top: 20, bottom: 20, left: 13, right: 13 }}
            onPress={onCancel}
          >
            <Text style={[styles.cancelText, {color: themedColours.primary[theme]}]}>Cancel</Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  }
);

export default NativeSearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#EEEEF0",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 40,
    gap: 8,
    borderRadius: 12,
    marginVertical: 20,
  },
  cancelText: {
    fontSize: 14,
    fontFamily: "Mulish_700Bold",
    color: COLOURS.darkGreen,
  },
});
