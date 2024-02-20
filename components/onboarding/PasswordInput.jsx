import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import ClearIcon from "../../svgs/ClearIcon";
import COLOURS from '../../constants/colours'
import { TextInput } from "react-native";
const PasswordInput = ({password, setPassword}) => {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <View
      style={[
        styles.input,
        isPasswordFocused && {
          borderColor: "black",
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
          <Text style={{ fontSize: 11, fontFamily: "Mulish_700Bold" }}>
            Password
          </Text>
        )}
        <TextInput
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          onChangeText={setPassword}
          value={password}
          contextMenuHidden={true}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          autoComplete={"off"}
          // keyboardType='ascii-capable'
          placeholder={isPasswordFocused ? "" : "Create Password"}
          style={{
            fontSize: 14,
            width: '100%',
            flex: 1,
            fontFamily:
              isPasswordFocused || password.length > 0
                ? "Mulish_500Medium"
                : "Mulish_700Bold",
            color: COLOURS.nearBlack,
          }}
        />
      </View>
      {isPasswordFocused && (
        <Pressable onPress={() => setPassword("")} style={{ alignSelf: "center" }}>
          <ClearIcon />
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