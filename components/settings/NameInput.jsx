import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import ClearIcon from "../../svgs/ClearIcon";
import COLOURS from '../../constants/colours'
import { TextInput } from "react-native";

const NameInput = ({name, setName, text}) => {
  const [isNameFocused, setIsNameFocused] = useState(false);

  const FocusedOrNonEmptyText = isNameFocused || name

  return (
    <View
      style={[
        styles.input,
        isNameFocused && {
          borderColor: "black",
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: FocusedOrNonEmptyText ? "space-between" : "center",
        }}
      >
        {FocusedOrNonEmptyText && (
          <Text style={{ fontSize: 11, fontFamily: "Mulish_700Bold" }}>
            {text}
          </Text>
        )}
        <TextInput
          onFocus={() => setIsNameFocused(true)}
          onBlur={() => setIsNameFocused(false)}
          onChangeText={setName}
          value={name}
          keyboardType='ascii-capable'
          autoCorrect={false}
          autoComplete={"off"}
          placeholder={FocusedOrNonEmptyText ? "" : text}
          style={{
            fontSize: 14,
            width: '100%',
            flex: 1,
            fontFamily:
              FocusedOrNonEmptyText || name.length > 0
                ? "Mulish_500Medium"
                : "Mulish_700Bold",
            color: COLOURS.nearBlack,
          }}
        />
      </View>
      {isNameFocused && name && (
        <Pressable onPress={() => setName("")} style={{ alignSelf: "center" }}>
          <ClearIcon />
        </Pressable>
      )}
    </View>
  );
};

export default NameInput;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 58,
    borderWidth: 1,
    borderColor: COLOURS.lightGray,
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: "row",
    borderRadius: 12,
    fontFamily: "Mulish_700Bold",
    justifyContent: "space-between",
  },
});