import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/settings/Header";
import COLOURS from "../constants/colours";
import auth from "@react-native-firebase/auth";
import { useEmailAuth } from "../hooks/useEmailAuth";

const DeleteAccount = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [currentPassword, setCurrentPassword] = useState("");

  const { handleEmailAccountDeletion } = useEmailAuth(currentPassword);

  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: 'white' }}>
      <Header
        onNavigate={() => navigation.goBack()}
        headerText={"Delete Account"}
      />
      <View style={{ padding: 20, gap: 8 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Mulish_500Medium",
            color: COLOURS.nearBlack,
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
          style={styles.input}
          placeholder="Current password"
        />
        <Pressable
          onPress={handleEmailAccountDeletion}
          style={{
            backgroundColor: COLOURS.darkGreen,
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
