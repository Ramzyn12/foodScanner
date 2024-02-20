import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import COLOURS from "../../constants/colours";
import { StyleSheet } from "react-native";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import FormSubmissionButton from "./FormSubmissionButton";
import { useNavigation } from "@react-navigation/native";
import { signUp } from "../../axiosAPI/authAPI";
import { useMutation } from "@tanstack/react-query";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation()

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: async (data) => {
      navigation.navigate('MainTabsStack', { 
        screen: 'DiaryStack',
        params: { 
          screen: 'CreateAccount', 
          params: { 
            token: data?.token, 
            firebaseId: data?.firebaseId 
          } 
        },
      });    },
    onError: (err) => {
      console.log(err, 'Error signing up to ur account...');
    },
  });

  const handleCreateAccount = () => {
    signUpMutation.mutate({ email, password });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        <FormSubmissionButton
          email={email}
          password={password}
          text={"Create an account"}
          onPress={handleCreateAccount}
        />
      </View>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  formContainer: {
    gap: 12,
    paddingHorizontal: 25,
  },
  container: {
    paddingTop: 30,
    marginTop: 30,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLOURS.lightGray,
  },
});
