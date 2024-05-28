import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/settings/Header";
import COLOURS from "../constants/colours";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";

const UpdatePassword = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const {theme} = useColourTheme()

  const handleChangePassword = async () => {
    const user = auth().currentUser;
    const email = user.email;
    const credential = auth.EmailAuthProvider.credential(
      email,
      currentPassword
    );

    try {
      await user.reauthenticateWithCredential(credential);

      if (newPassword.trim() === newPasswordRepeat.trim()) {
        user.updatePassword(newPassword);
        if (auth().currentUser) {
          auth().signOut();
        }
        Toast.show({
          type: "success",
          text1: "Password updated, Login!",
        });
      } else {
        Toast.show({
          type: "customErrorToast",
          text1: "Passwords not matching, try again",
        });
      }
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        Toast.show({
          type: "customErrorToast",
          text1: "Incorrect password, try again",
        });
      } else {
        Toast.show({
          type: "customErrorToast",
          text1: "Something went wrong, please try again later",
        });
      }
    }
  };

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: themedColours.primaryBackground[theme] }}>
      <Header
        onNavigate={() => navigation.goBack()}
        headerText={"Change Password"}
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
          Enter your new password to change your password
        </Text>
        <TextInput
          secureTextEntry
          autoCorrect={false}
          value={currentPassword}
          placeholderTextColor={themedColours.secondaryText[theme]}
          onChangeText={setCurrentPassword}
          style={[styles.input, {color: themedColours.primaryText[theme], borderColor: themedColours.stroke[theme]}]}
          placeholder="Current password"
        />
        <TextInput
          secureTextEntry
          autoCorrect={false}
          value={newPassword}
          placeholderTextColor={themedColours.secondaryText[theme]}

          onChangeText={setNewPassword}
          style={[styles.input, {color: themedColours.primaryText[theme], borderColor: themedColours.stroke[theme]}]}
          placeholder="New password"
        />
        <TextInput
          autoCorrect={false}
          secureTextEntry
          value={newPasswordRepeat}
          onChangeText={setNewPasswordRepeat}
          placeholderTextColor={themedColours.secondaryText[theme]}
          style={[styles.input, {color: themedColours.primaryText[theme], borderColor: themedColours.stroke[theme]}]}
          placeholder="Re-enter your new Password"
        />
        <Pressable
          onPress={handleChangePassword}
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
            Change Password
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

export default UpdatePassword;
