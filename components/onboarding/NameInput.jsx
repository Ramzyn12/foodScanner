import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import ClearIcon from "../../svgs/ClearIcon";
import COLOURS from '../../constants/colours'
import { TextInput } from "react-native";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";
const NameInput = ({name, setName, text}) => {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const {theme} = useColourTheme()
  return (
    <View
      style={[
        [styles.input, {borderColor: themedColours.stroke[theme]}],
        isNameFocused && {
          borderColor: themedColours.primary[theme],
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: isNameFocused ? "space-between" : "center",
        }}
      >
        {isNameFocused && (
          <Text style={{ fontSize: 11, fontFamily: "Mulish_700Bold", color: themedColours.primaryText[theme] }}>
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
          placeholderTextColor={themedColours.secondaryText[theme]}
          placeholder={isNameFocused ? "" : text}
          style={{
            fontSize: 14,
            width: '100%',
            flex: 1,
            fontFamily:
              isNameFocused || name.length > 0
                ? "Mulish_500Medium"
                : "Mulish_700Bold",
            color: themedColours.primaryText[theme],
          }}
        />
      </View>
      {isNameFocused && (
        <Pressable onPress={() => setName("")} style={{ alignSelf: "center" }}>
          <ClearIcon background={themedColours.secondaryBackground[theme]} crossColor={themedColours.secondaryText[theme]} />
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