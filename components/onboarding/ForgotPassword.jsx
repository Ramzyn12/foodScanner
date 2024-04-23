import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import EmailInput from './EmailInput'
import COLOURS from '../../constants/colours'
import auth from "@react-native-firebase/auth";
import Toast from 'react-native-toast-message';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('')
  const handleSendVerificationCode = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        navigation.goBack()
        Toast.show({
          text1: 'Email Sent',
          position: 'top'
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 34, fontFamily: 'Mulish_700Bold', color: COLOURS.nearBlack, marginBottom: 2}}>Forgot Password?</Text>
      <Text style={{fontSize: 14, fontFamily: 'Mulish_700Bold', color:'#636566', marginBottom: 20}}>Enter your email and we will send you a link to get back into your account. Make sure to check your spam</Text>
      <EmailInput email={email} setEmail={setEmail} />
      <Pressable
          onPress={handleSendVerificationCode}
          style={{
            backgroundColor: COLOURS.darkGreen,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
            marginTop: 14
          }}
        >
          <Text
            style={{
              color: "#F7F6EF",
              fontSize: 14,
              fontFamily: "Mulish_700Bold",
            }}
          >
            Send Verification Email
          </Text>
        </Pressable>
    </View>
  )
}

export default ForgotPassword