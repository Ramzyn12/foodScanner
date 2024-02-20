import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAppleAuth } from "../../hooks/useAppleAuth";
import AppleLogo from "../../svgs/AppleLogo";

const AppleButton = () => {
  const { handleAppleLogin, signUpAppleMutation } = useAppleAuth();

  return (
    <View
      style={{
        borderRadius: 12,
        backgroundColor: "#000",
      }}
    >
      <Pressable
        onPress={handleAppleLogin}
        style={{
          width: "100%",
          height: 44,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <AppleLogo />
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Mulish_600SemiBold",
            color: "#F7F6EF",
          }}
        >
          Continue with Apple
        </Text>
      </Pressable>
    </View>
  );
};

export default AppleButton;
