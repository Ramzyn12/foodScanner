import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import EmailInput from "./EmailInput";
import COLOURS from "../../constants/colours";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import GreenTickCircle from "../../svgs/GreenTickCircle";
import { Svg, Path } from "react-native-svg";
import ArrowLeft from "../../svgs/ArrowLeft";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColourTheme } from "../../context/Themed";
import { themedColours } from "../../constants/themedColours";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [showContinueMessage, setShowContinueMessage] = useState(false);
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useColourTheme();

  const handleSendVerificationCode = () => {
    setShowContinueMessage(false);
    setIsLoading(true);
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setShowContinueMessage(true);
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          Toast.show({
            type: "customErrorToast",
            text1: "Invalid email, please try again.",
          });
        } else if (err.code === "auth/user-not-found") {
          Toast.show({
            type: "customErrorToast",
            text1: "User not found with this email address. Please try again.",
          });
        } else {
          Toast.show({
            type: "customErrorToast",
            text1: "Failed to send email, please try again later.",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 20 + insets.top,
        gap: 12,
        backgroundColor: themedColours.primaryBackground[theme],
        flex: 1,
      }}
    >
      <Pressable
        hitSlop={40}
        style={{ marginBottom: 15 }}
        onPress={() => navigation.goBack()}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
        >
          <Path
            d="M5.52796 1.53269C5.82216 1.24111 5.82427 0.766238 5.53269 0.472041C5.24111 0.177844 4.76624 0.175726 4.47204 0.467309L2.67731 2.2461C2.00134 2.91604 1.44886 3.46359 1.05706 3.95146C0.649628 4.45878 0.354695 4.97372 0.275909 5.59184C0.241364 5.86286 0.241364 6.13714 0.275909 6.40816C0.354695 7.02628 0.649628 7.54122 1.05706 8.04854C1.44886 8.53641 2.00133 9.08395 2.6773 9.75389L4.47204 11.5327C4.76624 11.8243 5.24111 11.8222 5.53269 11.528C5.82427 11.2338 5.82216 10.7589 5.52796 10.4673L3.76499 8.72C3.0495 8.01086 2.55869 7.52282 2.22659 7.10929C1.904 6.7076 1.79332 6.44958 1.76387 6.2185C1.74538 6.07341 1.74538 5.92659 1.76387 5.7815C1.79332 5.55042 1.904 5.2924 2.22659 4.89071C2.55869 4.47718 3.0495 3.98914 3.76499 3.28L5.52796 1.53269Z"
            fill={themedColours.primaryText[theme]}
          />
        </Svg>
      </Pressable>

      <Text
        style={{
          fontSize: 34,
          fontFamily: "Mulish_700Bold",
          color: themedColours.primaryText[theme],
        }}
      >
        Forgotten your password?
      </Text>
      <EmailInput
        message={"Enter your email address"}
        email={email}
        setEmail={setEmail}
      />
      <Pressable
        onPress={handleSendVerificationCode}
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
          {isLoading ? <ActivityIndicator /> : "Continue"}
        </Text>
      </Pressable>
      {showContinueMessage && (
        <View
          style={{
            flexDirection: "row",
            backgroundColor: themedColours.tertiaryBackground[theme],
            padding: 14,
            gap: 10,
            borderRadius: 20,
            alignItems: "flex-start",
          }}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.5588 7.50027C15.8351 7.19167 15.8089 6.71752 15.5003 6.44123C15.1917 6.16493 14.7175 6.19113 14.4412 6.49973L11.0721 10.2629C10.3894 11.0254 9.9296 11.5363 9.53652 11.8667C9.16207 12.1814 8.94213 12.25 8.75 12.25C8.55787 12.25 8.33794 12.1814 7.96348 11.8667C7.5704 11.5363 7.11064 11.0254 6.42794 10.2629L5.55877 9.29209C5.28248 8.98349 4.80833 8.9573 4.49973 9.23359C4.19113 9.50988 4.16493 9.98403 4.44123 10.2926L5.34753 11.3049C5.98338 12.0152 6.51374 12.6076 6.99835 13.0149C7.51099 13.4458 8.06393 13.75 8.75 13.75C9.43607 13.75 9.98901 13.4458 10.5016 13.0149C10.9863 12.6076 11.5166 12.0152 12.1525 11.3049L15.5588 7.50027Z"
              fill={themedColours.primary[theme]}
            />
          </Svg>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Mulish_400Regular",
              color: themedColours.primaryText[theme],
              flex: 1,
            }}
          >
            {`If this email address is associated with an Ivy account, then we’ve sent your password reset instructions there. Please make sure to check your spam.`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ForgotPassword;
