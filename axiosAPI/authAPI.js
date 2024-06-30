import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../utils/MMKVStorage";
import auth from '@react-native-firebase/auth'

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL
const prev = "http://192.168.0.145:3000"
const authAPI = axios.create({
  baseURL: BACKEND_URL + "/api/v1/auth/",
});

export const signUpApple = async ({ email, uid, idToken, userInformation }) => {
  try {
    const response = await authAPI.post("signUpApple", {
      email,
      uid,
      idToken: idToken,
      userInformation
    });
    return response.data;
  } catch (error) {
    throw error
  }
};

export const signUp = async ({ email, password, userInfo }) => {
  if (password.length < 6) {
    throw new Error('Password needs to be at least 6 characters.')
  }

  try {
    const response = await authAPI.post("signUp", {
      email: email,
      password: password,
      userInfo
    });

    const data = response.data;

    // Does it make sense to have data.token and user.getIdToken()?
    if (data.token) {
      const userCredential = await auth().signInWithCustomToken(data.token);
      const user = userCredential.user;
      const token = await user.getIdToken(); // Get Firebase token
      storage.set('firebaseToken', token)
      return { user, token, firebaseId: data.firebaseId };
    }
  } catch (error) {
    // console.log("Error during sign up with email in authAPI", error);
    throw error;

  }
};

