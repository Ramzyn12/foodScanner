import {
  View,
  Text,
  StyleSheet,
  Pressable,
  InputAccessoryView,
} from "react-native";
import React, { useState } from "react";
import ClearIcon from "../../svgs/ClearIcon";
import COLOURS from "../../constants/colours";
import { TextInput } from "react-native";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";
const EmailInput = ({ email, setEmail, message }) => {
  //Maybe add some animations here so nicer focus
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const {theme} = useColourTheme()
  const text = message || 'Email Address'

  return (
    <View
      style={[
        [styles.input, {borderColor: themedColours.stroke[theme]}],
        isEmailFocused && {
          borderColor: themedColours.primary[theme],
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: isEmailFocused ? "space-between" : "center",
        }}
      >
        {isEmailFocused && (
          <Text style={{ fontSize: 11, fontFamily: "Mulish_700Bold", color: themedColours.primaryText[theme] }}>
            {text}
          </Text>
        )}
        <TextInput
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          textContentType='emailAddress'
          autoCorrect={false}
          keyboardType="email-address"
          autoComplete="email"
          placeholderTextColor={themedColours.secondaryText[theme]}
          placeholder={isEmailFocused ? "" : text}
          style={{
            fontSize: 14,
            width: "100%",
            flex: 1,
            fontFamily:
              isEmailFocused || email.length > 0
                ? "Mulish_500Medium"
                : "Mulish_700Bold",
            color: themedColours.primaryText[theme],
          }}
        />
      </View>

      {isEmailFocused && (
        <Pressable onPress={() => setEmail("")} style={{ alignSelf: "center" }}>
          <ClearIcon background={themedColours.secondaryBackground[theme]} crossColor={themedColours.secondaryText[theme]} />
        </Pressable>
      )}
    </View>
  );
};

export default EmailInput;

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
