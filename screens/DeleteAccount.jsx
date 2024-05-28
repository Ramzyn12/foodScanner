import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/settings/Header";
import COLOURS from "../constants/colours";
import auth from "@react-native-firebase/auth";
import { useEmailAuth } from "../hooks/useEmailAuth";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";

const DeleteAccount = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [currentPassword, setCurrentPassword] = useState("");
  const {theme} = useColourTheme()

  const { handleEmailAccountDeletion } = useEmailAuth(currentPassword);

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: themedColours.primaryBackground[theme] }}>
      <Header
        onNavigate={() => navigation.goBack()}
        headerText={"Delete Account"}
      />
      <View style={{ padding: 20, gap: 8 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Mulish_500Medium",
            color: themedColours.primaryText[theme],
            marginBottom: 8,
          }}
        >
          Enter your password to delete your account
        </Text>
        <TextInput
          secureTextEntry
          autoCorrect={false}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholderTextColor={themedColours.secondaryText[theme]}
          style={[styles.input, {color: themedColours.primaryText[theme], borderColor: themedColours.stroke[theme]}]}
          placeholder="Current password"
        />
        <Pressable
          onPress={handleEmailAccountDeletion}
          style={{
            backgroundColor: themedColours.primary[theme],
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#F7F6EF",
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
            }}
          >
            Delete my account
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

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

export default DeleteAccount;
