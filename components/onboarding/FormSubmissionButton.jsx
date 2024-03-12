import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";
import COLOURS from "../../constants/colours";

const FormSubmissionButton = ({
  onPress,
  email,
  password,
  firstName,
  lastName,
  text,
  isLoading,
}) => {
  const isEnabled =
    (email && password && password.length > 6) || (firstName && lastName);

  return (
    <Pressable
      onPress={isEnabled && !isLoading ? onPress : undefined} // Directly apply condition within onPress prop
      disabled={!isEnabled || isLoading} // Disable the button if not enabled or if loading
      style={[styles.buttonContainer, { opacity: isEnabled ? 1 : 0.4 }]}
    >
      <Text style={styles.buttonText}>
        {isLoading ? <ActivityIndicator /> : text || "Create an account"}
      </Text>
    </Pressable>
  );
};

export default FormSubmissionButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOURS.darkGreen,
  },
  buttonText: {
    color: "#F7F6EF",
    fontFamily: "Mulish_600SemiBold",
    fontSize: 14,
  },
});
