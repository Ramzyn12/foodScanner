import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import ClearIcon from "../../svgs/ClearIcon";
import COLOURS from '../../constants/colours'
import { TextInput } from "react-native";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";
const PasswordInput = ({password, setPassword}) => {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const {theme} = useColourTheme()
  return (
    <View
      style={[
        [styles.input, {borderColor: themedColours.stroke[theme]}],
        isPasswordFocused && {
          borderColor: themedColours.primary[theme],
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: isPasswordFocused ? "space-between" : "center",
        }}
      >
        {isPasswordFocused && (
          <Text style={{ fontSize: 11, fontFamily: "Mulish_700Bold", color: themedColours.primaryText[theme] }}>
            Password
          </Text>
        )}
        <TextInput
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          onChangeText={setPassword}
          value={password}
          autoCapitalize="none"
          textContentType="password"
          autoCorrect={false}
          keyboardType='ascii-capable'
          autoComplete={"off"}
          secureTextEntry={true}
          placeholderTextColor={themedColours.secondaryText[theme]}
          placeholder={isPasswordFocused ? "" : "Create Password"}
          style={{
            fontSize: 14,
            width: '100%',
            flex: 1,
            fontFamily:
              isPasswordFocused || password.length > 0
                ? "Mulish_500Medium"
                : "Mulish_700Bold",
            color: themedColours.primaryText[theme],
          }}
        />
      </View>
      {isPasswordFocused && (
        <Pressable hitSlop={8} onPress={() => setPassword("")} style={{ alignSelf: "center" }}>
          <ClearIcon background={themedColours.secondaryBackground[theme]} crossColor={themedColours.secondaryText[theme]} />
        </Pressable>
      )}
    </View>
  );
};

export default PasswordInput;

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